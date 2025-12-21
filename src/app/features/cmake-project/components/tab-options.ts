import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ProjectContextService } from '../services/project-context-service';
import { OptionsMaxCMakeVersion } from './options-max-cmake-version';
import { OptionsMaxCMakeVersionService } from '../services/options-max-cmake-version-service';
import { OptionsRootPath } from './options-root-path';
import { OptionsRootPathService } from '../services/options-root-path-service';

@Component({
  selector: 'app-tab-options',
  imports: [OptionsMaxCMakeVersion, OptionsRootPath],
  templateUrl: './tab-options.html',
  styleUrl: './tab-options.css',
  providers: [OptionsMaxCMakeVersionService, OptionsRootPathService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabOptions implements AfterViewInit {
  private readonly projectContext = inject(ProjectContextService);

  public readonly maxCMakeVersionSignal =
    viewChild.required<OptionsMaxCMakeVersion>('maxCMakeVersion');
  public readonly rootPathSignal =
    viewChild.required<OptionsRootPath>('rootPath');

  constructor() {
    effect(() => {
      const newCMakeVersion = this.maxCMakeVersionSignal().value;
      if (newCMakeVersion !== undefined) {
        this.projectContext.version = newCMakeVersion;
      }
    });

    effect(() => {
      const newRootPath = this.rootPathSignal().value;
      this.projectContext.rootPath = newRootPath;
    });
  }

  ngAfterViewInit() {
    this.maxCMakeVersionSignal().value = this.projectContext.version;
    this.rootPathSignal().value = this.projectContext.rootPath;
  }
}
