import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataToCMakeService {
  booleanToString(value: boolean): string {
    if (value) {
      return "ON";
    } else {
      return "OFF";
    }
  }
}
