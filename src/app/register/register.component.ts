import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error = '';
  registerForm = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(70),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[A-Za-z0-9]{3,8}$'),
    ]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {}

  submitRegisterForm(formValue: FormGroup) {
    this._AuthService.register(formValue.value).subscribe((response) => {
      if (response.id == 11) {
        console.log(response.id);
        this._Router.navigate(['/login']);
      } else {
        this.error = response; // response from APi
      }
    });
  }
}
