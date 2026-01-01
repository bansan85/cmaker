import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CMakeComponentInterface } from '../../../features/cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';

@Component({
  selector: 'app-version-tag',
  imports: [],
  templateUrl: './version-tag.html',
  styleUrl: './version-tag.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionTag {
  readonly element =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.required<CMakeComponentInterface<CMakeFeatureInterface<any>>>();
}
