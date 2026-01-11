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
import { CMakeProjectProjectNameIncludeBeforeVariableService } from '../services/cmake-project-project-name-include-before-variable-service';

@Component({
  selector: 'app-cmake-project-project-name-include-before-variable',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './cmake-project-project-name-include-before-variable.html',
  styleUrl: './cmake-project-project-name-include-before-variable.css',
  providers: [
    CMakeProjectProjectNameIncludeBeforeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(
        () => CMakeProjectProjectNameIncludeBeforeVariable
      ),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeProjectProjectNameIncludeBeforeVariable
  extends InputProjectNameFiles
  implements
    CMakeComponentInterface<CMakeProjectProjectNameIncludeBeforeVariableService>
{
  readonly name = 'CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE';

  protected readonly cmakeProjectProjectNameIncludeBeforeProjectNameId = `cmake-project-project-name-include-before-project-name-${crypto.randomUUID()}`;
  protected readonly cmakeProjectProjectNameIncludeBeforePathId = `cmake-project-project-name-include-before-path-${crypto.randomUUID()}`;

  readonly service = inject(
    CMakeProjectProjectNameIncludeBeforeVariableService
  );

  protected readonly validatorForProjectName = this.service.validateArg[0];
  protected readonly validatorForIncludes = this.service.validateArg[1];
}
