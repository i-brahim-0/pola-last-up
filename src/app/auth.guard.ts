import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private _AuthService: AuthService, private _Aouter: Router) {}

  canActivate(): boolean {
    if (this._AuthService.currentUser.getValue() != null) {
      return true; // Allow access if the user is authenticated
    } else {
      this._Aouter.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
