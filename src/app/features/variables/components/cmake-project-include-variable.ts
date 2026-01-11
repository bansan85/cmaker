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
import { InputFiles } from '../../../shared/directives/arguments/input-files';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { CMakeProjectIncludeVariableService } from '../services/cmake-project-include-variable-service';

@Component({
  selector: 'app-cmake-project-include-variable',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './cmake-project-include-variable.html',
  styleUrl: './cmake-project-include-variable.css',
  providers: [
    CMakeProjectIncludeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectIncludeVariable),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeProjectIncludeVariable
  extends InputFiles
  implements CMakeComponentInterface<CMakeProjectIncludeVariableService>
{
  readonly name = 'CMAKE_PROJECT_INCLUDE';

  protected readonly cmakeProjectIncludePathId = `cmake-project-include-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectIncludeVariableService);

  protected readonly validatorForIncludes = this.service.validateArg[0];
}
