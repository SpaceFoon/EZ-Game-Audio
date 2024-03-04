extern crate tauri;
use std::collections::HashMap;
use std::process::Command;
mod my_utils;

#[tauri::command]

async fn my_rust_function(
    input_file: String,
    output_file: String,
    output_format: String,
) -> Result<(String, String, i32, Vec<String>), String> {
    // Define the format configuration hashmap
    let format_config: HashMap<&str, (&str, &[&str])> = [
        ("ogg", ("libopus", &["-b:a", "192k"][..])),
        ("mp3", ("libmp3lame", &["-q:a", "3"][..])),
        ("wav", ("pcm_s16le", &[][..])),
        ("m4a", ("aac", &["-q:a", "1.1"][..])),
        ("flac", ("flac", &["-compression_level", "9"][..])),
    ]
    .iter()
    .cloned()
    .collect();
    // Retrieve codec and additional options from format configuration
    let (codec, additional_options) = match format_config.get(&output_format.as_str()) {
        Some(&(codec, options)) => (codec, options),
        None => {
            return Err(format!(
                "Output format '{}' not found in format configuration",
                output_format
            ))
        }
    };

    // Run ffmpeg.exe command
    let ffmpeg_command_output = Command::new("ffmpeg.exe")
        .arg("-loglevel")
        .arg("error")
        .arg("-i")
        .arg(&input_file)
        .arg("-c:a")
        .arg(codec)
        .args(additional_options)
        .arg("-vn")
        .arg("-y")
        .arg(&output_file)
        .output();

    // Check if ffmpeg command succeeded
    match ffmpeg_command_output {
        Ok(output) => {
            let mut stderr_outputs: Vec<String> = Vec::new();
            let stderr = String::from_utf8_lossy(&output.stderr);
            let stderr_clone = stderr.clone(); // Clone stderr before moving it
            let exit_code: i32 = output.status.code().unwrap_or_default();
            if !stderr.trim().is_empty() {
                // Add stderr output to the vector
                stderr_outputs.push(stderr_clone.into_owned());
            }
            // if exit_code != 0 {
            //     // Ffmpeg command failed
            //     format!(
            //         "ffmpeg command failed with exit code {}: {}",
            //         exit_code, stderr
            //     );
            // } else {
            //     println!("ffmpeg command successful!");
            // }
            let _ =
                my_utils::add_to_log(&input_file, &output_file, &exit_code, &stderr_outputs).await;
            // Return result of the function
            Ok((input_file, output_file, exit_code, stderr_outputs))
        }
        Err(err) => {
            // Error executing ffmpeg command
            Err(format!("Error executing ffmpeg command: {}", err))
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_rust_function])
        .run(tauri::generate_context!())
        .expect("error in rust thread");
}
