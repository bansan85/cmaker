import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { ProjectDescriptionService } from '../services/project-description-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectDescriptionModel } from '../models/project-description.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-description-argument',
  imports: [FormsModule],
  templateUrl: './project-description-argument.html',
  styleUrl: './project-description-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectDescriptionArgument),
    },
  ],
})
export class ProjectDescriptionArgument
  implements
    CMakeComponentInterface<ProjectDescriptionService>,
    CheckboxesItemInterface,
    ProjectDescriptionModel
{
  readonly name = 'Description';

  protected readonly labelDescriptionId = `project-description-${crypto.randomUUID()}`;

  readonly service = inject(ProjectDescriptionService);

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
