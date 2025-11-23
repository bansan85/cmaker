import { Component, inject, Input } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { Version } from '../../../shared/models/version';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';
import { FormsModule } from '@angular/forms';
import { VersionService } from '../../../shared/services/version-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectCompatVersionModel } from '../models/project-compat-version.model';

@Component({
  selector: 'app-project-compat-version-argument',
  imports: [FormsModule],
  templateUrl: './project-compat-version-argument.html',
  styleUrl: './project-compat-version-argument.css',
})
export class ProjectCompatVersionArgument
  implements
    CMakeComponentInterface<ProjectCompatVersionService>,
    CheckboxesItemInterface,
    ProjectCompatVersionModel
{
  service = inject(ProjectCompatVersionService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name = 'Compat version';
  readonly labelVersionId = `project-compat-version-${crypto.randomUUID()}`;

  private _value?: Version;

  @Input()
  set value(v: Version | undefined) {
    this._value = v;
    this.valueString = v ? v.toString() : '';
  }

  get value(): Version | undefined {
    return this._value;
  }

  private valueString = '';

  get versionString(): string {
    return this.valueString;
  }

  set versionString(value: string) {
    this.valueString = value;
    if (Version.isValid(value)) {
      this._value = new Version(value);
    } else {
      this._value = undefined;
    }
  }
}
