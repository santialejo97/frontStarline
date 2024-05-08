import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authHeader!: boolean;
  public roleUser!: boolean;
  private headerSubscription!: Subscription;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService._roleSubject.subscribe((value) => {
      this.roleUser = value;
    });
    this.authService._headerSubject.subscribe((value) => {
      this.authHeader = value;
      console.log(this.authHeader);
    });
  }

  routerHome() {
    this.router.navigateByUrl('startLink/home');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }
}
