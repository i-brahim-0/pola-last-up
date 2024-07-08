import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveCurrentUser();
    }
  }
  currentUser = new BehaviorSubject(null);

  register(formData: any): Observable<any> {
    return this._HttpClient.post('https://fakestoreapi.com/users', formData);
  }
  login(formData: any): Observable<any> {
    return this._HttpClient.post(
      'https://fakestoreapi.com/auth/login',
      formData
    );
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem('userToken');
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser);
  }
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
  }
}
