import { Component, forwardRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeProjectProjectNameIncludeVariableService } from '../services/cmake-project-project-name-include-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputProjectNameFiles } from '../../../shared/directives/arguments/input-project-name-files';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';

@Component({
  selector: 'app-cmake-project-project-name-include-variable',
  imports: [FormsModule, ValidTag, VersionTag],
  templateUrl: './cmake-project-project-name-include-variable.html',
  styleUrl: './cmake-project-project-name-include-variable.css',
  providers: [
    CMakeProjectProjectNameIncludeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectProjectNameIncludeVariable),
    },
  ],
})
export class CMakeProjectProjectNameIncludeVariable
  extends InputProjectNameFiles
  implements
    CMakeComponentInterface<CMakeProjectProjectNameIncludeVariableService>
{
  readonly name = 'CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE';

  protected readonly cmakeProjectProjectNameIncludeProjectNameId = `cmake-project-project-name-include-project-name-${crypto.randomUUID()}`;
  protected readonly cmakeProjectProjectNameIncludePathId = `cmake-project-project-name-include-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectProjectNameIncludeVariableService);
}
