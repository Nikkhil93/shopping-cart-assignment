import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update confirmPasswordErrorMsg onSubmit', ()=>{
    setTimeout(()=>{component.registerForm.setValue({
      "firstName": "test",
      "lastName": "test",
      "email": 'test.com',
      "password": 'test14',
      "confirmPassword": 'test14'
    });
    component.submit();
    expect(component.confirmPasswordErrorMsg).toBe("");
  });
  });

  it('should update confirmPasswordErrorMsg with message onSubmit', ()=>{
    setTimeout(()=>{component.registerForm.setValue({
      "firstName": "test",
      "lastName": "test",
      "email": 'test.com',
      "password": 'test14',
      "confirmPassword": ''
    });
    component.submit();
    expect(component.confirmPasswordErrorMsg).toBe("Confirm Password is required and should match password.");
  });
  });
});
