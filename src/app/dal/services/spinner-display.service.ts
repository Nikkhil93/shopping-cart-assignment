import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SpinnerDisplayService {
  showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}