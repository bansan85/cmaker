import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectNameService } from '../services/project-name-service';
import { FormsModule } from '@angular/forms';
import { ProjectNameModel } from '../models/project-name.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-name-argument',
  imports: [FormsModule],
  templateUrl: './project-name-argument.html',
  styleUrl: './project-name-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectNameArgument),
    },
  ],
})
export class ProjectNameArgument
  implements
    CMakeComponentInterface<ProjectNameService>,
    CheckboxesItemInterface,
    ProjectNameModel
{
  readonly name = 'Name';

  protected readonly projectNameId = `project-name-${crypto.randomUUID()}`;

  readonly service = inject(ProjectNameService);

  constructor() {
    effect(async () => {
      console.log('TOTO');
      this.isValid.set(await this.service.isValid(this));
      console.log(this.isValid());
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
