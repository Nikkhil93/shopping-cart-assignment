import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm;
  confirmPasswordErrorMsg: string = '';
  formSubmitted: boolean = false

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.formSubmitted = true;
    const confirmPassword = this.registerForm.controls.confirmPassword.value
    if (confirmPassword === "" || (confirmPassword !== this.registerForm.controls.password.value)) {
      this.confirmPasswordErrorMsg = "Confirm Password is required and should match password.";
    } else {
      this.confirmPasswordErrorMsg = "";
    }
    if (this.registerForm.valid) {
      this.route.navigate(['/home']);
    }
  }

}
