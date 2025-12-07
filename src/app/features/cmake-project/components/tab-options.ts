import { Component, inject } from '@angular/core';
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
  protected readonly tabOptionsMaxCMakeVersionId = `max-cmake-version-${crypto.randomUUID()}`;
  protected readonly tabOptionsRootPathId = `root-path-${crypto.randomUUID()}`;

  protected readonly projectContext = inject(ProjectContextService);

  get versionString(): string {
    return this.projectContext.version.toString();
  }

  set versionString(value: string) {
    if (Version.isValid(value)) {
      this.projectContext.version = new Version(value);
    }
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
