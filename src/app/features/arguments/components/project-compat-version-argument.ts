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
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';

@Component({
  selector: 'app-project-compat-version-argument',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './project-compat-version-argument.html',
  styleUrl: './project-compat-version-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectCompatVersionArgument),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCompatVersionArgument
  extends InputVersion
  implements CMakeComponentInterface<ProjectCompatVersionService>
{
  readonly name = 'Compat version';

  protected readonly labelVersionId = `project-compat-version-${crypto.randomUUID()}`;

  readonly service = inject(ProjectCompatVersionService);

  protected readonly validatorForCompatVersion = this.service.validateArg[0];
}
