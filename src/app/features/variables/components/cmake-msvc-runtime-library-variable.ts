import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { InputCheckbox } from '../../../shared/directives/arguments/input-checkbox';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeMsvcRuntimeLibraryVariableService } from '../services/cmake-msvc-runtime-library-variable-service';

@Component({
  selector: 'app-cmake-msvc-runtime-library-variable',
  imports: [FormsModule, ValidTag, VersionTag],
  templateUrl: './cmake-msvc-runtime-library-variable.html',
  styleUrl: './cmake-msvc-runtime-library-variable.css',
  providers: [
    CMakeMsvcRuntimeLibraryVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeMsvcRuntimeLibraryVariable),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeMsvcRuntimeLibraryVariable
  extends InputCheckbox
  implements CMakeComponentInterface<CMakeMsvcRuntimeLibraryVariableService>
{
  readonly name = 'CMAKE_MSVC_RUNTIME_LIBRARY';

  protected readonly cmakeMsvcRuntimeLibraryCheckboxId = `cmake-msvc-runtime-library-checkbox-${crypto.randomUUID()}`;

  readonly service = inject(CMakeMsvcRuntimeLibraryVariableService);

  protected readonly checkedSignal = signal(true);
}
