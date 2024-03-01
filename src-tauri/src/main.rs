#[allow(unused)]
use std::collections::HashMap;
use std::env;
use std::path::Path;
use std::process::Command;

#[tauri::command]
async fn my_rust_function(
    input_file: String,
    output_file: String,
    output_format: String,
    resource_path: String,
) -> Result<String, String> {
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

    // Check if ffmpeg executable exists
    if !Path::new(&resource_path).exists() {
        return Err(format!("ffmpeg executable not found at: {}", resource_path));
    }
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
            if output.status.success() {
                // Ffmpeg command succeeded
                println!("ffmpeg command successful!");
                Ok(format!("Received file object: {:?}", output_format))
            } else {
                // Ffmpeg command failed
                let stderr = String::from_utf8_lossy(&output.stderr);
                Err(format!("ffmpeg command failed: {}", stderr))
            }
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
