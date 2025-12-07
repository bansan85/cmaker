use pathdiff::diff_paths;
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::Path;

// create the error type that represents all errors possible in our program
#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

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

#[tauri::command]
fn load_from_file(path: &str) -> Result<String, Error> {
    Ok(fs::read_to_string(path)?)
}

#[tauri::command]
fn save_to_file(path: &str, content: &str) -> Result<(), Error> {
    let mut file = File::create(path)?;
    file.write_all(content.as_bytes())?;
    Ok(())
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
            diff_path,
            load_from_file,
            save_to_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
