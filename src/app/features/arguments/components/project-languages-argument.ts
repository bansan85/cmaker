import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  signal,
} from '@angular/core';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { InputLanguages } from '../../../shared/directives/arguments/input-languages';
import { CheckboxesItemInterface } from '../../../shared/interfaces/checkboxes-item-interface';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectLanguagesService } from '../services/project-languages-service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLanguagesArgument
  extends InputLanguages
  implements CMakeComponentInterface<ProjectLanguagesService>
{
  readonly name = 'Languages';

  protected readonly projectLanguagesId = `project-languages-${crypto.randomUUID()}`;

  readonly service = inject(ProjectLanguagesService);

  protected readonly validatorForLanguages = this.service.validateArg[0];

  protected override allLanguages = this.service.allLanguages.map((item) =>
    signal<CheckboxesItemInterface>({
      enabled: false,
      name: item.name,
      version: item.version,
    })
  );
}
