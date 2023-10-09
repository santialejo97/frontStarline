import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

import { AuthServiceService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authServices: AuthServiceService
  ) {}
  canActivate(): Observable<boolean> | boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('auth/login');
    }
    return this.authServices.validToken().pipe(
      map((data) => data),
      catchError((err) => this.router.navigateByUrl('auth/login'))
    );
  }
}
