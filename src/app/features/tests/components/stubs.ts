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
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';

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
  readonly element = input.required<CMakeComponentInterface<unknown>>();
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
@Component({
  selector: 'app-ui-tabs',
  template: '',
})
export class StubTabs {}
@Component({
  selector: 'app-ui-tab-item',
  template: '',
})
export class StubTabItem {}

@Component({
  selector: 'app-tab-options',
  template: '',
})
export class StubTabOptions {}
@Component({
  selector: 'app-tab-project',
  template: '',
})
export class StubTabProject {}
@Component({
  selector: 'app-tab-target',
  template: '',
})
export class StubTabTarget {}
@Component({
  selector: 'app-draggable-list',
  template: '',
})
export class StubDraggableListComponent {}
@Component({
  selector: 'app-draggable-item',
  template: '',
})
export class StubDraggableItemComponent {}
@Component({
  selector: 'app-project-spdx-license-argument',
  template: '',
})
export class StubProjectSpdxLicenseArgument {}
@Component({
  selector: 'app-project-version-argument',
  template: '',
})
export class StubProjectVersionArgument {}
@Component({
  selector: 'app-project-compat-version-argument',
  template: '',
})
export class StubProjectCompatVersionArgument {}
@Component({
  selector: 'app-project-description-argument',
  template: '',
})
export class StubProjectDescriptionArgument {}
@Component({
  selector: 'app-project-homepage-url-argument',
  template: '',
})
export class StubProjectHomepageUrlArgument {}
@Component({
  selector: 'app-project-languages-argument',
  template: '',
})
export class StubProjectLanguagesArgument {}
@Component({
  selector: 'app-project-name-argument',
  template: '',
})
export class StubProjectNameArgument {}
