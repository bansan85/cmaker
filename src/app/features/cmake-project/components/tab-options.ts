import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';

import { InputDirectoryModel } from '../../../shared/models/arguments/input-directory-model';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { OptionsModel } from '../models/options.model';
import { OptionsMaxCMakeVersion } from './options-max-cmake-version';
import { OptionsRootPath } from './options-root-path';

@Component({
  selector: 'app-tab-options',
  imports: [OptionsMaxCMakeVersion, OptionsRootPath],
  templateUrl: './tab-options.html',
  styleUrl: './tab-options.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabOptions implements OptionsModel {
  public readonly maxCMakeVersionSignal =
    viewChild.required<OptionsMaxCMakeVersion>('maxCMakeVersion');
  public readonly rootPathSignal =
    viewChild.required<OptionsRootPath>('rootPath');

  get maxCMakeVersion(): InputVersionModel {
    return this.maxCMakeVersionSignal();
  }
  get rootPath(): InputDirectoryModel {
    return this.rootPathSignal();
  }
}
