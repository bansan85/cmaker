import { Component, forwardRef, inject } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';
import { FormsModule } from '@angular/forms';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputVersion } from '../../../shared/directives/arguments/input-version';

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
  extends InputVersion
  implements CMakeComponentInterface<ProjectCompatVersionService>
{
  readonly name = 'Compat version';

  protected readonly labelVersionId = `project-compat-version-${crypto.randomUUID()}`;

  readonly service = inject(ProjectCompatVersionService);
}
