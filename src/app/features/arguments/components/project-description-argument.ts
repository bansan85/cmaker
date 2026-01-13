import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { ProjectDescriptionService } from '../services/project-description-service';

@Component({
  selector: 'app-project-description-argument',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './project-description-argument.html',
  styleUrl: './project-description-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectDescriptionArgument),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDescriptionArgument
  extends InputString
  implements CMakeComponentInterface<ProjectDescriptionService>
{
  readonly itemName = 'Description';

  protected readonly labelDescriptionId = `project-description-${crypto.randomUUID()}`;

  readonly service = inject(ProjectDescriptionService);

  protected readonly validatorForDescription = this.service.validateArg[0];
}
