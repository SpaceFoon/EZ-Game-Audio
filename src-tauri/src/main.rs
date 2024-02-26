// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
//mod convert_files;
//use convert_files;
use num_cpus;

#[tauri::command]
fn get_num_cpus() -> usize {
    num_cpus::get()
}

fn main() {
    tauri::Builder::new()
        .invoke_handler(tauri::generate_handler![get_num_cpus])
        .run();
}

// fn main() {
//     tauri::Builder::default()
//         // This is where you pass in your commands
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("failed to run app");
// }
