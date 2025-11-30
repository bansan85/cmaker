import { Component, forwardRef, inject } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectLanguagesService } from '../services/project-languages-service';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputLanguages } from '../../../shared/directives/arguments/input-languages';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';

@Component({
  selector: 'app-project-languages-argument',
  imports: [CheckboxesList, CheckboxesItem, ValidTag, VersionTag],
  templateUrl: './project-languages-argument.html',
  styleUrl: './project-languages-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectLanguagesArgument),
    },
  ],
})
export class ProjectLanguagesArgument
  extends InputLanguages
  implements CMakeComponentInterface<ProjectLanguagesService>
{
  readonly name = 'Languages';

  protected readonly projectLanguagesId = `project-languages-${crypto.randomUUID()}`;

  readonly service = inject(ProjectLanguagesService);
}
