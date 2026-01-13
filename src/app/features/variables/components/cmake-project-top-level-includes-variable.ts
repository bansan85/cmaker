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
import { CMakeProjectTopLevelIncludesVariableService } from '../services/cmake-project-top-level-includes-variable-service';

@Component({
  selector: 'app-cmake-project-top-level-includes-variable',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './cmake-project-top-level-includes-variable.html',
  styleUrl: './cmake-project-top-level-includes-variable.css',
  providers: [
    CMakeProjectTopLevelIncludesVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectTopLevelIncludesVariable),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeProjectTopLevelIncludesVariable extends InputFiles {
  readonly itemName = 'CMAKE_PROJECT_TOP_LEVEL_INCLUDES';

  protected readonly cmakeProjectTopLevelIncludesPathId = `cmake-project-top-level-includes-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectTopLevelIncludesVariableService);

  protected readonly validatorForIncludes = this.service.validateArg[0];
}
