import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SpinnerDisplayService } from '../../services/spinner-display.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;
  public formSubmitted: boolean = false;
  public password: string;
  public email: string;
  public incorrectDetails: boolean = false;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private spinnerDisplayService: SpinnerDisplayService
  ) { }

  ngOnInit(): void { }

  /* Will be calling the login api, fetch the list of users, if the entered user matches any
    then user will be redirected to 'home' else an error block will be shown with
    test email and test password
  */
  public submit() {
    this.spinnerDisplayService.showSpinner$.next(true);
    this.formSubmitted = true;
    this.loginService.loginDetails().subscribe((res)=>{
      this.spinnerDisplayService.showSpinner$.next(false);
      const matchedUser = res.filter(userDetails => userDetails.email === this.email && userDetails.password === this.password);
      if (this.loginForm.valid && matchedUser.length===1) {
        this.route.navigate(['/home']);
      }
      else{
        this.incorrectDetails = true;
      }
    })
  }
}
