import { Version } from "../../../shared/models/version";

export class ProjectMsvcModel {
    msvcRuntimeLibrary: boolean | null = null;

    cmakeMinVersion(): Version | null {
        if (this.msvcRuntimeLibrary === null) {
            return null;
        } else {
            return new Version("3.15");
        }
    }
}
