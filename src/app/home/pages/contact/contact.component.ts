import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { ContactService } from 'src/app/services/contact/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public formContact: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    description: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  observe: Observer<{ ok: boolean; msg: string }> = {
    next: (value: { ok: boolean; msg: string }) => {
      Swal.fire({
        title: `${value.msg}`,
        icon: 'success',
        timer: 4000,
      });
      this.formContact.setValue({
        name: '',
        email: '',
        phone: '',
        description: '',
      });
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

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {}

  createContact() {
    const data = this.formContact.value;
    this.contactService.createContact(data).subscribe(this.observe);
  }
}
