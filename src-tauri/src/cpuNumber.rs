// In your Tauri backend code (e.g., src-tauri/main.rs)

// Import the num_cpus crate
use num_cpus;

// Define a function to retrieve the number of CPU cores
#[tauri::command]
fn get_num_cpus() -> usize {
    // Use the num_cpus crate to get the number of logical CPUs
    num_cpus::get()
}

// Register the function as a Tauri command
fn main() {
    tauri::AppBuilder::new()
        .invoke_handler(tauri::generate_handler![get_num_cpus])
        .run();
}
