import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root',
})
export class RustBackendService {
  async directoryExists(path: string): Promise<boolean> {
    return await invoke<boolean>('directory_exists', { path });
  }
  async directoriesExists(paths: string[]): Promise<boolean> {
    return await invoke<boolean>('directories_exists', { paths });
  }
}
