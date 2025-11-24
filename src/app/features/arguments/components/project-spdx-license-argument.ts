import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectSpdxLicenseService } from '../services/project-spdx-license-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectSpdxLicenseModel } from '../models/project-spdx-license.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-spdx-license-argument',
  imports: [FormsModule],
  templateUrl: './project-spdx-license-argument.html',
  styleUrl: './project-spdx-license-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectSpdxLicenseArgument),
    },
  ],
})
export class ProjectSpdxLicenseArgument
  implements
    CMakeComponentInterface<ProjectSpdxLicenseService>,
    CheckboxesItemInterface,
    ProjectSpdxLicenseModel
{
  readonly name = 'License';

  protected readonly projectSpdxLicenseId = `project-spdx-license-${crypto.randomUUID()}`;
  protected readonly projectSpdxLicenseListId = `project-spdx-license-list-${crypto.randomUUID()}`;

  readonly service = inject(ProjectSpdxLicenseService);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(false);

  enabled = true;

  protected valueSignal = signal('');
  get value(): string {
    return this.valueSignal();
  }
  set value(val: string) {
    this.valueSignal.set(val);
  }
}
