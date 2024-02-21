use std::path::PathBuf;
use tokio::process::Command;

async fn convert_files(files: Vec<PathBuf>) -> Result<(Vec<PathBuf>, Vec<PathBuf>, f64), Box<dyn std::error::Error>> {
    let job_start_time = std::time::Instant::now();
    let cpu_number = num_cpus::get();

    let max_concurrent_workers = std::cmp::min(cpu_number, files.len());
    println!("\n   Detected 🕵️‍♂️ {} CPU Cores 🖥", cpu_number);
    println!("   Using {} concurrent 🧵 threads", cpu_number);

    let mut failed_files = Vec::new();
    let mut successful_files = Vec::new();

    let mut worker_tasks = Vec::new();
    for _ in 0..max_concurrent_workers {
        let mut files = files.clone();
        worker_tasks.push(tokio::spawn(async move {
            while let Some(file) = files.pop() {
                if let Err(err) = process_file(file).await {
                    eprintln!("Error processing file: {}", err);
                    failed_files.push(file);
                } else {
                    successful_files.push(file);
                }
            }
        }));
    }

    // Wait for all worker tasks to finish
    for task in worker_tasks {
        task.await?;
    }

    let elapsed_time = job_start_time.elapsed().as_secs_f64();
    Ok((failed_files, successful_files, elapsed_time))
}

async fn process_file(file: PathBuf) -> Result<(), Box<dyn std::error::Error>> {
    let ffmpeg_path = format!("{}/ffmpeg.exe", std::env::current_dir()?.display());

    let args = [
        "-loglevel", "error",
        "-i", file.to_str().unwrap(),
        // Add your ffmpeg command options here
        "-y",
        "output_file_here",
    ];

    let status = Command::new(ffmpeg_path)
        .args(&args)
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
    let files: Vec<PathBuf> = std::env::args().skip(1).map(PathBuf::from).collect();

    match convert_files(files).await {
        Ok((failed_files, successful_files, elapsed_time)) => {
            println!("Job completed in {:.2} seconds", elapsed_time);
            println!("Successful files: {:?}", successful_files);
            println!("Failed files: {:?}", failed_files);
        }
        Err(err) => eprintln!("Error: {}", err),
    }
}
