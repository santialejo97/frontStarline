import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { service } from 'src/app/interfaces/star.interface';
import { StartServiceService } from 'src/app/services/startline/start-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  public formService: FormGroup = this.fb.group({
    name: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', Validators.required],
    isactive: [true, Validators.required],
  });
  public service!: service;
  public id: string = '';

  constructor(
    private fb: FormBuilder,
    private start: StartServiceService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routes.params.subscribe(({ id }) => {
      this.id = id;
      this.start.getService(id).subscribe((data) => {
        this.service = data;
        this.formService.patchValue({
          name: this.service.nameservice,
          descripcion: this.service.descripcion,
          precio: this.service.precio,
          isactive: this.service.isactive,
        });
      });
    });
  }

  editar() {
    this.start
      .editService(this.id, this.formService.value)
      .subscribe(this.createObsever());
  }

  createObsever(): Observer<any> {
    const observe: Observer<{ ok: boolean; msg: string }> = {
      next: (value: { ok: boolean; msg: string }) => {
        Swal.fire({
          title: `${value.msg}`,
          icon: 'success',
          timer: 4000,
        });
        this.router.navigateByUrl(`startLink/admin`);
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Un error surgio en la actualización del servicio`,
        });
      },
      complete: function (): void {},
    };
    return observe;
  }
}
