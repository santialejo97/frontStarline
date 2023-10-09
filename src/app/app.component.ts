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
    const value = JSON.parse(headerAuth);
    this.authService._headerSubject.next(value);
  }
  title = 'frontend';
}
