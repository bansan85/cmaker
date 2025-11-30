import { Component, forwardRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeProjectTopLevelIncludesVariableService } from '../services/cmake-project-top-level-includes-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputFiles } from '../../../shared/directives/arguments/input-files';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';

@Component({
  selector: 'app-cmake-project-top-level-includes-variable',
  imports: [FormsModule, ValidTag, VersionTag],
  templateUrl: './cmake-project-top-level-includes-variable.html',
  styleUrl: './cmake-project-top-level-includes-variable.css',
  providers: [
    CMakeProjectTopLevelIncludesVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectTopLevelIncludesVariable),
    },
  ],
})
export class CMakeProjectTopLevelIncludesVariable
  extends InputFiles
  implements
    CMakeComponentInterface<CMakeProjectTopLevelIncludesVariableService>
{
  readonly name = 'CMAKE_PROJECT_TOP_LEVEL_INCLUDES';

  protected readonly cmakeProjectTopLevelIncludesPathId = `cmake-project-top-level-includes-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectTopLevelIncludesVariableService);
}
