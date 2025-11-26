import { Component, forwardRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeMsvcRuntimeLibraryVariableService } from '../services/cmake-msvc-runtime-library-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputCheckbox } from '../../../shared/directives/arguments/input-checkbox';

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
  extends InputCheckbox
  implements CMakeComponentInterface<CMakeMsvcRuntimeLibraryVariableService>
{
  readonly name = 'CMAKE_MSVC_RUNTIME_LIBRARY';

  protected readonly cmakeMsvcRuntimeLibraryCheckboxId = `cmake-msvc-runtime-library-checkbox-${crypto.randomUUID()}`;

  readonly service = inject(CMakeMsvcRuntimeLibraryVariableService);

  protected valueSignal = signal(true);
}
