import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CMakeComponentInterface } from '../../../features/cmake-project/models/cmake-component-interface';

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
    input.required<CMakeComponentInterface<any>>();
}
