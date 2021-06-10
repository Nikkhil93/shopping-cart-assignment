import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class CartDialogService{
  public closeClicked: Subject<boolean> = new Subject<boolean>();
}
