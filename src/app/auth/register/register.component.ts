import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { Observer } from 'rxjs';
import { RegisterAuth } from 'src/app/interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private validPass: boolean = false;
  public formRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirma: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.validPass = true;
    delete this.formRegister.value().cofirmar;
    this.authService
      .register(this.formRegister.value)
      .subscribe(this.createObsever());
  }

  createObsever(): Observer<any> {
    const observe: Observer<RegisterAuth> = {
      next: (value: RegisterAuth) => {
        this.router.navigateByUrl('auth/login');
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Un error surgio en el Registro por favor valide sus datos.`,
        });
      },
      complete: function (): void {},
    };
    return observe;
  }

  validPassword(): boolean {
    const password1 = this.formRegister.get('password')?.value;
    const password2 = this.formRegister.get('confirmar')?.value;
    return password1 !== password2 && this.validPass ? true : false;
    return true;
  }

  validField(field: string) {
    return this.formRegister.get(field)?.touched &&
      this.formRegister.get(field)?.invalid
      ? true
      : false;
  }
}
