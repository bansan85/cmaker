import { Component, forwardRef, inject, Input } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectVersionService } from '../services/project-version-service';
import { Version } from '../../../shared/models/version';
import { FormsModule } from '@angular/forms';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectVersionModel } from '../models/project-version.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-version-argument',
  imports: [FormsModule],
  templateUrl: './project-version-argument.html',
  styleUrl: './project-version-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectVersionArgument),
    },
  ],
})
export class ProjectVersionArgument
  implements
    CMakeComponentInterface<ProjectVersionService>,
    CheckboxesItemInterface,
    ProjectVersionModel
{
  service = inject(ProjectVersionService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name = 'Version';
  readonly projectVersionId = `project-version-${crypto.randomUUID()}`;

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
