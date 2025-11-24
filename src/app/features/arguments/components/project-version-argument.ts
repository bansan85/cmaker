import {
  Component,
  effect,
  forwardRef,
  inject,
  Input,
  signal,
} from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectVersionService } from '../services/project-version-service';
import { Version } from '../../../shared/models/version';
import { FormsModule } from '@angular/forms';
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
  readonly name = 'Version';

  protected readonly projectVersionId = `project-version-${crypto.randomUUID()}`;

  readonly service = inject(ProjectVersionService);

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
