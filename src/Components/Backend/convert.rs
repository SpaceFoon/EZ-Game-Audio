use std::path::PathBuf;
use tokio::process::Command;

async fn converter_worker(input_file: PathBuf, output_file: PathBuf, output_format: &str) -> Result<(), Box<dyn std::error::Error>> {
    let ffmpeg_path = format!("{}/ffmpeg.exe", std::env::current_dir()?.display());

    let format_config = vec![
        ("ogg", ("libopus", vec!["-b:a", "192k"])),
        ("mp3", ("libmp3lame", vec!["-q:a", "3"])),
        ("wav", ("pcm_s16le", vec![])),
        ("m4a", ("aac", vec!["-q:a", "1.1"])),
        ("flac", ("flac", vec!["-compression_level", "9"])),
    ];
    let (codec, additional_options) = format_config.iter()
        .find(|(format, _)| format == &output_format)
        .ok_or("Output format not supported")?.1;

    let mut args = vec![
        "-loglevel", "error",
        "-i", &input_file.to_string_lossy(),
        "-c:a", codec,
        "-vn",
        "-y",
        &output_file.to_string_lossy(),
    ];
    args.extend(additional_options);

    let status = Command::new(ffmpeg_path)
        .args(args)
        .status()
        .await?;
    
    if status.success() {
        Ok(())
    } else {
        Err("FFmpeg command failed".into())
    }
}

#[tokio::main]
async fn main() {
    let input_file = std::env::args().nth(1).expect("Input file path is required");
    let output_file = std::env::args().nth(2).expect("Output file path is required");
    let output_format = std::env::args().nth(3).expect("Output format is required");

    let input_file = PathBuf::from(input_file);
    let output_file = PathBuf::from(output_file);

    if let Err(err) = converter_worker(input_file, output_file, &output_format).await {
        eprintln!("Error: {}", err);
    }
}
