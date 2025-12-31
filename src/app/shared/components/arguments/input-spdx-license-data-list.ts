import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-spdx-license-data-list',
  imports: [],
  templateUrl: './input-spdx-license-data-list.html',
  styleUrl: './input-spdx-license-data-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSpdxLicenseDataList {
  readonly inputSpdxLicenseListId = `project-spdx-license-list-${crypto.randomUUID()}`;
}
