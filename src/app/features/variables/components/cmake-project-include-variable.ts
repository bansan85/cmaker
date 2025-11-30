import { Component, forwardRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectIncludeVariableService } from '../services/cmake-project-include-variable-service';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputFiles } from '../../../shared/directives/arguments/input-files';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';

@Component({
  selector: 'app-cmake-project-include-variable',
  imports: [FormsModule, ValidTag],
  templateUrl: './cmake-project-include-variable.html',
  styleUrl: './cmake-project-include-variable.css',
  providers: [
    CMakeProjectIncludeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectIncludeVariable),
    },
  ],
})
export class CMakeProjectIncludeVariable
  extends InputFiles
  implements CMakeComponentInterface<CMakeProjectIncludeVariableService>
{
  readonly name = 'CMAKE_PROJECT_INCLUDE';

  protected readonly cmakeProjectIncludePathId = `cmake-project-include-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectIncludeVariableService);
}
