import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule, RouterTestingModule],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call openDialog from cartAction',()=>{
    //@ts-ignore
    spyOn(component,'openDialog');
    component.cartAction();
    //@ts-ignore
    expect(component.openDialog).toHaveBeenCalledTimes(1);
  });
  it('should redirect from cartAction',()=>{
    let router = TestBed.inject(Router);
    spyOn(router,'navigate');
    //@ts-ignore
    component.isAboveMedium = false;
    component.cartAction();
    expect(router.navigate).toHaveBeenCalled();
  })
});
