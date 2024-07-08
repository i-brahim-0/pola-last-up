import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error = '';
  loginForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.pattern('mor_2314'),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {}
  submitLoginForm(loginValue: FormGroup) {
    this._AuthService.login(loginValue.value).subscribe((response) => {
      if (response != undefined) {
        localStorage.setItem('userToken', response.token);
        this._AuthService.saveCurrentUser();
        this._Router.navigate(['/home']);
      } else {
        this._Router.navigate(['/login']);
      }
    });
  }
}
