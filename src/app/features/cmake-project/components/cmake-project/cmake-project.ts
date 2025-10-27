import { Component } from '@angular/core';
import { Tabs } from "../../../tab/components/tabs";
import { TabItem } from "../../../tab/components/tab-item";
import { TabProject } from '../../../tab/components/tab-project';
import { TabTarget } from '../../../target/components/target';

@Component({
  selector: 'app-cmake-project',
  imports: [Tabs, TabItem],
  templateUrl: './cmake-project.html',
  styleUrl: './cmake-project.css'
})
export class CMakeProject {
  tabProject = TabProject;
  tabTarget = TabTarget;
}
