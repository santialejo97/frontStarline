import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, delay, tap } from 'rxjs';

import Swal from 'sweetalert2';

import { LoginAuth } from 'src/app/interfaces/auth.interface';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService
      .login(this.formLogin.value)
      .pipe(
        tap((value) => {
          Swal.fire({
            title: `Bienvenido a StartLink, ${value.usuario.fullname}`,
            icon: 'success',
            timer: 4000,
          });
        }),
        delay(2000)
      )
      .subscribe(this.createObsever());
  }

  createObsever(): Observer<any> {
    const observe: Observer<LoginAuth> = {
      next: (value: LoginAuth) => {
        this.authService.setHeaderSubject(true);
        this.router.navigateByUrl('startLink');
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Un error surgio en el login por favor valide sus datos.`,
        });
      },
      complete: function (): void {},
    };
    return observe;
  }
}
