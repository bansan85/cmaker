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
import { InputProjectNameFiles } from '../../../shared/directives/arguments/input-project-name-files';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { CMakeProjectProjectNameIncludeVariableService } from '../services/cmake-project-project-name-include-variable-service';

@Component({
  selector: 'app-cmake-project-project-name-include-variable',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './cmake-project-project-name-include-variable.html',
  styleUrl: './cmake-project-project-name-include-variable.css',
  providers: [
    CMakeProjectProjectNameIncludeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectProjectNameIncludeVariable),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeProjectProjectNameIncludeVariable
  extends InputProjectNameFiles
  implements
    CMakeComponentInterface<CMakeProjectProjectNameIncludeVariableService>
{
  readonly itemName = 'CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE';

  protected readonly cmakeProjectProjectNameIncludeProjectNameId = `cmake-project-project-name-include-project-name-${crypto.randomUUID()}`;
  protected readonly cmakeProjectProjectNameIncludePathId = `cmake-project-project-name-include-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectProjectNameIncludeVariableService);

  protected readonly validatorForProjectName = this.service.validateArg[0];
  protected readonly validatorForIncludes = this.service.validateArg[1];
}
