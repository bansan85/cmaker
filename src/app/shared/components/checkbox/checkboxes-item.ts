import { Component, inject, input } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { VersionService } from '../../services/version-service';
import { ProjectContextService } from '../../../features/cmake-project/services/project-context-service';

@Component({
  selector: 'app-checkboxes-item',
  imports: [],
  templateUrl: './checkboxes-item.html',
  styleUrl: './checkboxes-item.css',
})
export class CheckboxesItem {
  readonly element = input.required<CheckboxesItemInterface>();

  private readonly projectContext = inject(ProjectContextService);
  private readonly versionService = inject(VersionService);

  isHidden(): boolean {
    const version =
      this.element().service?.cmakeMinVersion ?? this.element().version ?? null;
    if (!version) {
      return false;
    }
    return this.versionService.isGreater(version, this.projectContext.version);
  }
}
