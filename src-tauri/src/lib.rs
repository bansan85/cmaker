use pathdiff::diff_paths;
use std::path::Path;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn path_exists(path: &str, directory: bool) -> bool {
    if directory {
        return Path::new(path).is_dir();
    } else {
        return Path::new(path).is_file();
    }
}

#[tauri::command]
fn paths_exists(paths: Vec<String>, directory: bool) -> bool {
    if directory {
        paths.iter().all(|path| Path::new(path).is_dir())
    } else {
        paths.iter().all(|path| Path::new(path).is_file())
    }
}

#[tauri::command]
fn relative_paths_exists(base: &str, paths: Vec<String>, directory: bool) -> bool {
    if directory {
        paths
            .iter()
            .all(|path| Path::new(&format!("{}/{}", base, path)).is_dir())
    } else {
        paths
            .iter()
            .all(|path| Path::new(&format!("{}/{}", base, path)).is_file())
    }
}

#[tauri::command]
fn diff_path(path: &str, base: &str) -> String {
    match diff_paths(path, base) {
        Some(p) => match p.into_os_string().into_string() {
            Ok(p2) => p2,
            Err(_) => path.to_string(),
        },
        None => path.to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            path_exists,
            paths_exists,
            relative_paths_exists,
            diff_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
