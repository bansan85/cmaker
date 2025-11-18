import { Component, inject, OnInit } from '@angular/core';
import { Tabs } from '../../tab/components/tabs';
import { TabItem } from '../../tab/components/tab-item';
import { ProjectContextService } from '../services/project-context-service';
import { TabProject } from './tab-project';
import { TabTarget } from './tab-target';
import { TabOptions } from './tab-options';

@Component({
  selector: 'app-cmake-project',
  imports: [Tabs, TabItem],
  templateUrl: './cmake-project.html',
  styleUrl: './cmake-project.css',
  providers: [ProjectContextService],
})
export class CMakeProject {
  tabOptions = TabOptions;
  tabProject = TabProject;
  tabTarget = TabTarget;
}
