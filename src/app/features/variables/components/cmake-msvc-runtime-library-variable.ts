import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeMsvcRuntimeLibraryVariableService } from '../services/cmake-msvc-runtime-library-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeMsvcRuntimeLibraryVariableModel } from '../models/cmake-msvc-runtime-library.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';

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
    CheckboxesItemInterface,
    CMakeMsvcRuntimeLibraryVariableModel
{
  readonly name = 'CMAKE_MSVC_RUNTIME_LIBRARY';

  protected readonly cmakeMsvcRuntimeLibraryCheckboxId = `cmake-msvc-runtime-library-checkbox-${crypto.randomUUID()}`;

  readonly service = inject(CMakeMsvcRuntimeLibraryVariableService);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(true);

  enabled = true;

  protected valueSignal = signal(false);
  get value(): boolean {
    return this.valueSignal();
  }
  set value(val: boolean) {
    this.valueSignal.set(val);
  }
}
