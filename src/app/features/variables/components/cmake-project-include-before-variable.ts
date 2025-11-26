import { Component, forwardRef, inject } from '@angular/core';
import { CMakeProjectIncludeBeforeVariableService } from '../services/cmake-project-include-before-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputFiles } from '../../../shared/directives/arguments/input-files';

@Component({
  selector: 'app-cmake-project-include-before-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-include-before-variable.html',
  styleUrl: './cmake-project-include-before-variable.css',
  providers: [
    CMakeProjectIncludeBeforeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectIncludeBeforeVariable),
    },
  ],
})
export class CMakeProjectIncludeBeforeVariable
  extends InputFiles
  implements CMakeComponentInterface<CMakeProjectIncludeBeforeVariableService>
{
  readonly name = 'CMAKE_PROJECT_INCLUDE_BEFORE';

  protected readonly cmakeProjectIncludeBeforePathId = `cmake-project-include-before-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectIncludeBeforeVariableService);
}
