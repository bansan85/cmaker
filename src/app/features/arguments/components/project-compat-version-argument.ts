import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { Version } from '../../../shared/models/version';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';
import { FormsModule } from '@angular/forms';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectCompatVersionModel } from '../models/project-compat-version.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-compat-version-argument',
  imports: [FormsModule],
  templateUrl: './project-compat-version-argument.html',
  styleUrl: './project-compat-version-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectCompatVersionArgument),
    },
  ],
})
export class ProjectCompatVersionArgument
  implements
    CMakeComponentInterface<ProjectCompatVersionService>,
    CheckboxesItemInterface,
    ProjectCompatVersionModel
{
  readonly name = 'Compat version';

  protected readonly labelVersionId = `project-compat-version-${crypto.randomUUID()}`;

  readonly service = inject(ProjectCompatVersionService);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(false);

  enabled = true;

  private valueSignal = signal<Version | undefined>(undefined);
  set value(v: Version | undefined) {
    this.valueSignal.set(v);
    this.valueString = v ? v.toString() : '';
  }
  get value(): Version | undefined {
    return this.valueSignal();
  }

  private valueString = '';
  get versionString(): string {
    return this.valueString;
  }
  set versionString(value: string) {
    this.valueString = value;
    if (Version.isValid(value)) {
      this.valueSignal.set(new Version(value));
    } else {
      this.valueSignal.set(undefined);
    }
  }
}
