import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-license-data-list',
  imports: [],
  templateUrl: './input-license-data-list.html',
  styleUrl: './input-license-data-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputLicenseDataList {
  readonly inputLicenseListId = `project-spdx-license-list-${crypto.randomUUID()}`;
}
