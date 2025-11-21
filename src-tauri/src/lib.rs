use std::path::Path;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn directory_exists(path: &str) -> bool {
    return Path::new(path).exists();
}

#[tauri::command]
fn directories_exists(paths: Vec<String>) -> bool {
    paths.iter().all(|path| Path::new(path).exists())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            directory_exists,
            directories_exists
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
