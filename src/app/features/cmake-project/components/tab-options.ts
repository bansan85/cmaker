import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectContextService } from '../services/project-context-service';
import { AbstractControl, FormsModule } from '@angular/forms';
import { Version } from '../../../shared/models/version';
import { open } from '@tauri-apps/plugin-dialog';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Component({
  selector: 'app-tab-options',
  imports: [FormsModule, AsyncInvalidValidator],
  templateUrl: './tab-options.html',
  styleUrl: './tab-options.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabOptions {
  protected readonly tabOptionsMaxCMakeVersionId = `max-cmake-version-${crypto.randomUUID()}`;
  protected readonly tabOptionsRootPathId = `root-path-${crypto.randomUUID()}`;

  readonly projectContext = inject(ProjectContextService);
  private readonly rustBackendService = inject(RustBackendService);

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

  protected checkPath = async (
    control: AbstractControl<string>
  ): Promise<boolean> =>
    this.rustBackendService.pathExists(control.value, true);
}
