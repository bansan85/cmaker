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
import { CMakeProjectIncludeBeforeVariableService } from '../services/cmake-project-include-before-variable-service';

@Component({
  selector: 'app-cmake-project-include-before-variable',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './cmake-project-include-before-variable.html',
  styleUrl: './cmake-project-include-before-variable.css',
  providers: [
    CMakeProjectIncludeBeforeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectIncludeBeforeVariable),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeProjectIncludeBeforeVariable
  extends InputFiles
  implements CMakeComponentInterface<CMakeProjectIncludeBeforeVariableService>
{
  readonly name = 'CMAKE_PROJECT_INCLUDE_BEFORE';

  protected readonly cmakeProjectIncludeBeforePathId = `cmake-project-include-before-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectIncludeBeforeVariableService);

  protected readonly validatorForIncludes = this.service.validateArg[0];
}
