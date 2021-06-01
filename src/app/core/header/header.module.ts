import { NgModule } from "@angular/core";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        BrowserModule,
        MatDialogModule,
        RouterModule
    ], 
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
      ],
    exports: [HeaderComponent]
})
export class HeaderModule {}