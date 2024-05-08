import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { service } from 'src/app/interfaces/star.interface';
import { StartServiceService } from 'src/app/services/startline/start-service.service';
import Swal from 'sweetalert2';
import { Contact } from '../../../interfaces/contact.interface';
import { ContactService } from 'src/app/services/contact/contact.service';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
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
  contact: Contact[] = [];

  constructor(
    private start: StartServiceService,
    private router: Router,
    private contactServices: ContactService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.authService._roleSubject.subscribe((value) => {
      if (value) {
        this.getListService();
        this.listContact();
      } else {
        this.router.navigateByUrl('startLink/home');
      }
    });
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
        this.listContact();
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

  listContact() {
    this.contactServices.getContacts().subscribe((contacts) => {
      this.contact = contacts;
    });
  }

  isActive(data: boolean, id: string) {
    console.log(data, id);
    this.contactServices
      .updateContact(data, id)
      .subscribe(this.createObsever());
  }
}
