import { Component, input } from '@angular/core';
import { CMakeComponentInterface } from '../../../features/cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';

@Component({
  selector: 'app-version-tag',
  imports: [],
  templateUrl: './version-tag.html',
  styleUrl: './version-tag.css',
})
export class VersionTag {
  readonly element =
    input.required<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>();
}
