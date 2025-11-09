import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectService } from "../services/project-service";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { ProjectLicenseArgument } from "./project-license-argument";
import { ProjectLicenseService } from "../services/project-license-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { ProjectVersionService } from "../services/project-version-service";
import { ProjectVersionArgument } from "./project-version-argument";
import { ProjectCompatVersionService } from "../services/project-compat-version-service";
import { ProjectCompatVersionArgument } from "./project-compat-version-argument";
import { ProjectDescriptionService } from "../services/project-description-service";
import { ProjectDescriptionArgument } from "./project-description-argument";
import { ProjectHomepageUrlArgument } from "./project-homepage-url-argument";
import { ProjectHomepageUrlService } from "../services/project-homepage-url-service";
import { VersionService } from "../../../shared/services/version-service";
import { CheckboxesItem } from "../../../shared/components/checkbox/checkboxes-item";
import { CheckboxesList } from "../../../shared/components/checkbox/checkboxes-list";

@Component({
  selector: "app-project-command",
  imports: [
    FormsModule,
    ProjectLicenseArgument,
    ProjectVersionArgument,
    ProjectCompatVersionArgument,
    ProjectDescriptionArgument,
    ProjectHomepageUrlArgument,
    CheckboxesList,
    CheckboxesItem,
  ],
  templateUrl: "./project-command.html",
  styleUrl: "./project-command.css",
  providers: [
    ProjectService,
    ProjectLicenseService,
    ProjectVersionService,
    ProjectCompatVersionService,
    ProjectDescriptionService,
    ProjectHomepageUrlService,
  ],
})
export class ProjectCommand implements CMakeComponentInterface<ProjectService> {
  @ViewChild("license") license!: ProjectLicenseArgument;
  @ViewChild("version") version!: ProjectVersionArgument;
  @ViewChild("compatVersion") compatVersion!: ProjectCompatVersionArgument;
  @ViewChild("description") description!: ProjectDescriptionArgument;
  @ViewChild("homepageUrl") homepageUrl!: ProjectHomepageUrlArgument;

  service = inject(ProjectService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  name: string = "";
}
