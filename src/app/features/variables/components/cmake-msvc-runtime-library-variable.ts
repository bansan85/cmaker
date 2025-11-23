import { Component, forwardRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeMsvcRuntimeLibraryVariableService } from '../services/cmake-msvc-runtime-library-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CMakeMsvcRuntimeLibraryVariableModel } from '../models/cmake-msvc-runtime-library.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-cmake-msvc-runtime-library-variable',
  imports: [FormsModule],
  templateUrl: './cmake-msvc-runtime-library-variable.html',
  styleUrl: './cmake-msvc-runtime-library-variable.css',
  providers: [
    CMakeMsvcRuntimeLibraryVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeMsvcRuntimeLibraryVariable),
    },
  ],
})
export class CMakeMsvcRuntimeLibraryVariable
  implements
    CMakeComponentInterface<CMakeMsvcRuntimeLibraryVariableService>,
    CMakeMsvcRuntimeLibraryVariableModel
{
  service = inject(CMakeMsvcRuntimeLibraryVariableService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  readonly cmakeMsvcRuntimeLibraryCheckboxId = `cmake-msvc-runtime-library-checkbox-${crypto.randomUUID()}`;

  enabled = true;
  value = false;
}
