import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { CMakeComponentInterface } from '../interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { OptionsMaxCMakeVersionService } from '../services/options-max-cmake-version-service';
import { ProjectContextService } from '../services/project-context-service';

@Component({
  selector: 'app-options-max-cmake-version',
  imports: [FormsModule],
  templateUrl: './options-max-cmake-version.html',
  styleUrl: './options-max-cmake-version.css',
  providers: [OptionsMaxCMakeVersionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsMaxCMakeVersion
  extends InputVersion
  implements
    CMakeComponentInterface<OptionsMaxCMakeVersionService>,
    AfterViewInit
{
  private readonly projectContext = inject(ProjectContextService);

  readonly name = 'Max CMake version';

  protected readonly optionsMaxCMakeVersionId = `options-max-cmake-version-${crypto.randomUUID()}`;

  readonly service = inject(OptionsMaxCMakeVersionService);

  private readonly initialized = signal(false);

  constructor() {
    super();

    effect(() => {
      if (this.initialized()) {
        this.projectContext.maxCMakeVersion = this.version;
      }
    });
  }

  ngAfterViewInit() {
    this.version = this.projectContext.maxCMakeVersion.version;
    this.initialized.set(true);
  }
}
