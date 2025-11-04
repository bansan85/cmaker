import { Component, inject } from '@angular/core';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-homepage-url-argument',
  imports: [FormsModule],
  templateUrl: './project-homepage-url-argument.html',
  styleUrl: './project-homepage-url-argument.css'
})
export class ProjectHomepageUrlArgument implements CMakeComponentInterface<ProjectHomepageUrlService> {
  service = inject(ProjectHomepageUrlService);

  enabled = false;
  value = "";
}
