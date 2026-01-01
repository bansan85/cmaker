import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TabItem } from '../../tab/components/tab-item';
import { Tabs } from '../../tab/components/tabs';
import { ProjectContextService } from '../services/project-context-service';
import { TabOptions } from './tab-options';
import { TabProject } from './tab-project';
import { TabTarget } from './tab-target';

@Component({
  selector: 'app-cmake-project',
  imports: [Tabs, TabItem, TabOptions, TabProject, TabTarget],
  templateUrl: './cmake-project.html',
  styleUrl: './cmake-project.css',
  providers: [ProjectContextService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMakeProject {}
