import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root',
})
export class RustBackendService {
  async pathExists(path: string, directory: boolean): Promise<boolean> {
    return await invoke<boolean>('path_exists', { path, directory });
  }
  async pathsExists(paths: string[], directory: boolean): Promise<boolean> {
    return await invoke<boolean>('paths_exists', { paths, directory });
  }
  async relativePathsExists(
    base: string,
    paths: string[],
    directory: boolean
  ): Promise<boolean> {
    return await invoke<boolean>('relative_paths_exists', {
      base,
      paths,
      directory,
    });
  }
  async diffPath(base: string, path: string): Promise<string> {
    return await invoke<string>('diff_path', { path, base });
  }
}
