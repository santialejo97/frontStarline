import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthServiceService) {
    const headerAuth = localStorage.getItem('header') || '';
    const roleAuth = localStorage.getItem('role') || '';
    console.log(headerAuth);
    if (headerAuth != '') {
      const value = JSON.parse(headerAuth);
      this.authService._headerSubject.next(value);
    }
    if (roleAuth != '') {
      const valueRole = JSON.parse(roleAuth);
      this.authService._roleSubject.next(valueRole);
    }
  }

  title = 'frontend';
}
