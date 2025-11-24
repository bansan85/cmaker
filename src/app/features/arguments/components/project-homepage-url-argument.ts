import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectHomepageUrlModel } from '../models/project-homepage-url.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-homepage-url-argument',
  imports: [FormsModule],
  templateUrl: './project-homepage-url-argument.html',
  styleUrl: './project-homepage-url-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectHomepageUrlArgument),
    },
  ],
})
export class ProjectHomepageUrlArgument
  implements
    CMakeComponentInterface<ProjectHomepageUrlService>,
    CheckboxesItemInterface,
    ProjectHomepageUrlModel
{
  readonly name = 'Homepage';

  protected readonly projectHomepageUrlId = `project-homepage-url-${crypto.randomUUID()}`;

  readonly service = inject(ProjectHomepageUrlService);

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
