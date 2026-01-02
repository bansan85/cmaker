import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputDirectory } from '../../../shared/directives/arguments/input-directory';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { CMakeComponentInterface } from '../interfaces/cmake-component-interface';
import { OptionsRootPathService } from '../services/options-root-path-service';
import { ProjectContextService } from '../services/project-context-service';

@Component({
  selector: 'app-options-root-path',
  imports: [AsyncInvalidValidator, FormsModule],
  templateUrl: './options-root-path.html',
  styleUrl: './options-root-path.css',
  providers: [OptionsRootPathService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsRootPath
  extends InputDirectory
  implements CMakeComponentInterface<OptionsRootPathService>, AfterViewInit
{
  private readonly projectContext = inject(ProjectContextService);

  readonly name = 'Root path';

  protected readonly optionsRootPathId = `options-root-path-${crypto.randomUUID()}`;

  readonly service = inject(OptionsRootPathService);

  protected readonly validatorForRootPath = this.service.validateArg[0];

  private readonly initialized = signal(false);

  constructor() {
    super();

    effect(() => {
      if (this.initialized()) {
        this.projectContext.rootPath = this.directory;
      }
    });
  }

  ngAfterViewInit() {
    this.directory = this.projectContext.rootPath.directory;
    this.initialized.set(true);
  }
}
