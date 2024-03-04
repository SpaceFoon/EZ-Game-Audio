// use tauri::Manager;

// // Define a payload struct for the event
// #[derive(Clone, serde::Serialize)]
// struct Payload {
//     message: String,
// }

// // Function to emit the event

// // Define your function here
// pub fn emit_event() {
//     // Initialize Tauri and access the app instance
//     let app = tauri::App::new();

//     // Emit a global event called "panic_occurred" after panic
//     app.emit_all(
//         "panic_occurred",
//         Payload {
//             message: "Panic occurred!".into(),
//         },
//     )
//     .unwrap();
// }

// fn main() {
//     // Set a panic hook
//     panic::set_hook(Box::new(|_| {
//         // Call the function to emit the event
//         emit_event();
//     }));

//     // Tauri setup and run code
//     tauri::Builder::default()
//         .setup(|app| {
//             // Listen to the global "event-name" event
//             let id = app.listen_global("event-name", |event| {
//                 println!("got event-name with payload {:?}", event.payload());
//             });
//             // Unlisten to the event using the `id` returned on the `listen_global` function
//             // A `once_global` API is also exposed on the `App` struct
//             app.unlisten(id);

//             // Emit the "event-name" event to all webview windows on the frontend
//             app.emit_all(
//                 "event-name",
//                 Payload {
//                     message: "Tauri is awesome!".into(),
//                 },
//             )
//             .unwrap();
//             Ok(())
//         })
//         .run(tauri::generate_context!())
//         .expect("failed to run app");
// }
