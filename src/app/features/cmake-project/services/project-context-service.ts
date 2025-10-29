import { Injectable } from "@angular/core";
import { Version } from "../../../shared/models/version";

@Injectable({
  providedIn: null,
})
export class ProjectContextService {
  version!: Version;
}
