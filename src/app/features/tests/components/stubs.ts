// eslint-disable-next-line max-classes-per-file
import { Component, Directive, input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { CheckboxesItemInterface } from '../../../shared/interfaces/checkboxes-item-interface';
import { ValidatorInterface } from '../../../shared/interfaces/validator-interface';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

@Component({ selector: 'app-options-max-cmake-version', template: '' })
export class StubOptionsMaxCMakeVersion {}
@Component({ selector: 'app-options-root-path', template: '' })
export class StubOptionsRootPath {}
@Component({ selector: 'app-valid-tag', template: '' })
export class StubValidTag {
  readonly validator = input.required<ValidatorInterface>();
}
@Component({ selector: 'app-version-tag', template: '' })
export class StubVersionTag {
  readonly element =
    input.required<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>();
}
@Component({ selector: 'app-checkboxes-list', template: '' })
export class StubCheckboxesList {
  readonly icon = input<string>('');
  readonly itemsId = input.required<string>();
}
@Component({ selector: 'app-checkboxes-item', template: '' })
export class StubCheckboxesItem {
  readonly element = input.required<CheckboxesItemInterface>();
}
@Directive({
  selector: '[appInvalidValidator]',
})
export class StubInvalidValidator implements Validator {
  readonly appInvalidValidator =
    input.required<(control: AbstractControl) => boolean>();
  readonly appInvalidValidatorContext = input.required<unknown>();

  validate(_control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
@Directive({
  selector: '[appAsyncInvalidValidator]',
})
export class StubAsyncInvalidValidator implements AsyncValidator {
  readonly appAsyncInvalidValidator = input.required<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (control: AbstractControl, context: any) => Promise<boolean>
  >();
  readonly appAsyncInvalidValidatorContext = input.required<unknown>();

  validate(
    _control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return Promise.resolve(null);
  }
}
@Component({
  selector: 'app-input-spdx-license-data-list',
  template: '',
})
export class StubInputSpdxLicenseDataList {
  readonly inputSpdxLicenseListId = '';
}
