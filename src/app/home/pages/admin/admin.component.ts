import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { service } from 'src/app/interfaces/star.interface';
import { StartServiceService } from 'src/app/services/startline/start-service.service';
import Swal from 'sweetalert2';
interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  servicios: service[] = [];

  constructor(private start: StartServiceService, private router: Router) {}

  ngOnInit() {
    this.getListService();
  }

  getListService() {
    this.start.getListServices().subscribe((data) => {
      this.servicios = data;
    });
  }

  editar(id: string) {
    this.router.navigateByUrl(`startLink/service/${id}`);
  }

  delete(id: string) {
    this.start.deleteService(id).subscribe(this.createObsever());
  }

  createObsever(): Observer<any> {
    const observe: Observer<{ ok: boolean; msg: string }> = {
      next: (value: { ok: boolean; msg: string }) => {
        this.getListService();
        Swal.fire({
          title: `${value.msg}`,
          icon: 'success',
          timer: 4000,
        });
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Un error surgio en la eliminacion del servicio`,
        });
      },
      complete: function (): void {},
    };
    return observe;
  }
}
