use chrono::Local;
use std::fs::{create_dir_all, File, OpenOptions};
use std::io::{self, Write};
use std::path::Path;
use tauri::api::path::app_data_dir;
use tauri_utils::config::Config;
// mod emit_all;

fn is_file_busy(log_name: &Path) -> io::Result<bool> {
    match File::open(log_name) {
        Ok(_) => {
            // File was successfully opened, so it is available
            println!("File was successfully opened");
            Ok(false)
        }
        Err(err) => {
            if err.kind() == io::ErrorKind::PermissionDenied {
                print!("File is locked by another process");
                // File is exclusively locked by another process
                Ok(true)
            } else {
                print!("some other file busy error occurred");
                // Handle other errors
                Err(err)
            }
        }
    }
}

pub async fn add_to_log(
    input_file: &String,
    output_file: &String,
    exit_code: &i32,
    stderr_outputs: &Vec<String>,
) -> io::Result<()> {
    let timestamp = Local::now().format("%Y-%m-%d %H:%M:%S");

    let config = Config::default();

    let log_dir = match app_data_dir(&config) {
        Some(mut path) => {
            path.push("ez-audio");
            if let Err(err) = create_dir_all(&path) {
                return Err(io::Error::new(
                    io::ErrorKind::NotFound,
                    format!("Failed to create log directory: {}", err),
                ));
            }
            path
        }
        None => {
            return Err(io::Error::new(
                io::ErrorKind::NotFound,
                "Failed to get app data directory",
            ));
        }
    };
    let mut csv_row = format!(
        "{},{},{},{}\n",
        timestamp, exit_code, input_file, output_file
    );
    let mut logs_file = &log_dir.join("logs.csv");
    let errors_file = &log_dir.join("error.csv");
    let lock_file = log_dir.join(".~lock.logs.csv#");
    let lock_e_file = log_dir.join(".~lock.error.csv#");
    if lock_file.exists() {
        // emit_event(true);
        panic!("Lock file exists for logs.csv");
        // Handle the case where the lock file exists
    }
    if lock_e_file.exists() {
        // emit_event(true);
        panic!("Lock file exists for error.csv");
    }

    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&logs_file)?;
    let _ = is_file_busy(logs_file);

    if file.metadata()?.len() == 0 {
        if *exit_code == 0 {
            writeln!(file, "Timestamp,Exit Code,Input,Output")?;
        }
    }

    file.write_all(csv_row.as_bytes())?;

    if !stderr_outputs.is_empty() {
        if file.metadata()?.len() == 0 {
            writeln!(file, "Timestamp,Exit Code,Errors, Input,Output")?;
        }
        let stderr_output_str = stderr_outputs.join(", ");
        let csv_row = format!(
            "{},{},{},{},{}\n",
            timestamp, exit_code, stderr_output_str, input_file, output_file
        );
        logs_file = errors_file;
        let _ = is_file_busy(logs_file);
        file.write_all(csv_row.as_bytes())?;
    }

    Ok(())
}
