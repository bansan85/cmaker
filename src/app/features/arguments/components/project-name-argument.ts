import { Component, forwardRef, inject, signal } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectNameService } from '../services/project-name-service';
import { FormsModule } from '@angular/forms';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';

@Component({
  selector: 'app-project-name-argument',
  imports: [FormsModule, ValidTag, VersionTag],
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
  extends InputString
  implements CMakeComponentInterface<ProjectNameService>
{
  readonly name = 'Name';

  protected readonly projectNameId = `project-name-${crypto.randomUUID()}`;

  readonly service = inject(ProjectNameService);
}
