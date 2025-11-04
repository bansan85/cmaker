import { Component, inject } from '@angular/core';
import { ProjectDescriptionService } from '../services/project-description-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-description-argument',
  imports: [FormsModule],
  templateUrl: './project-description-argument.html',
  styleUrl: './project-description-argument.css'
})
export class ProjectDescriptionArgument implements CMakeComponentInterface<ProjectDescriptionService> {
  service = inject(ProjectDescriptionService);

  enabled = false;
  value = "";
}
