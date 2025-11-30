import { Component, forwardRef, inject, signal } from '@angular/core';
import { ProjectDescriptionService } from '../services/project-description-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';

@Component({
  selector: 'app-project-description-argument',
  imports: [FormsModule, ValidTag],
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
  extends InputString
  implements CMakeComponentInterface<ProjectDescriptionService>
{
  readonly name = 'Description';

  protected readonly labelDescriptionId = `project-description-${crypto.randomUUID()}`;

  readonly service = inject(ProjectDescriptionService);
}
