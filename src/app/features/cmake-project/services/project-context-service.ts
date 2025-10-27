import { NgPluralCase } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: null,
})
export class ProjectContextService {
  version!: string;
}
