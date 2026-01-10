import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { InputDirectoryModel } from '../models/arguments/input-directory-model';

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
    base: string | InputDirectoryModel,
    paths: string[],
    directory: boolean
  ): Promise<boolean> {
    const baseString = typeof base === 'string' ? base : base.directory;
    if (baseString === '') {
      return Promise.resolve(false);
    }
    return await invoke<boolean>('relative_paths_exists', {
      baseString,
      paths,
      directory,
    });
  }

  async diffPath(
    base: string | InputDirectoryModel,
    path: string
  ): Promise<string> {
    const baseString = typeof base === 'string' ? base : base.directory;
    return await invoke<string>('diff_path', { path, baseString });
  }

  async loadFromFile(path: string): Promise<string> {
    return await invoke<string>('load_from_file', { path });
  }
  async saveToFile(path: string, content: string) {
    await invoke('save_to_file', { path, content });
  }
}
