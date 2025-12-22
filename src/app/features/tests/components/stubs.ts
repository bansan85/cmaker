// eslint-disable-next-line max-classes-per-file
import { Component, input } from '@angular/core';
import { ValidatorInterface } from '../../../shared/interfaces/validator-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';

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
