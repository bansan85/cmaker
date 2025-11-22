import { AfterViewInit, Component, inject } from '@angular/core';
import { ProjectContextService } from '../services/project-context-service';
import { FormsModule } from '@angular/forms';
import { Version } from '../../../shared/models/version';
import { open } from '@tauri-apps/plugin-dialog';

@Component({
  selector: 'app-tab-options',
  imports: [FormsModule],
  templateUrl: './tab-options.html',
  styleUrl: './tab-options.css',
})
export class TabOptions {
  projectContext = inject(ProjectContextService);

  get versionString(): string {
    return this.projectContext.version.toString();
  }

  set versionString(value: string) {
    if (Version.isValid(value)) {
      this.projectContext.version = new Version(value);
    }
  }

  get rootPath(): string {
    return this.projectContext.rootPath;
  }

  set rootPath(value: string) {
    this.projectContext.rootPath = value;
  }

  async selectPath() {
    const rootPath = await open({
      multiple: false,
      directory: true,
    });

    if (rootPath !== null) {
      this.projectContext.rootPath = rootPath;
    }
  }
}
