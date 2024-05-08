import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Contact,
  CreateContact,
  MessageContact,
} from 'src/app/interfaces/contact.interface';
import { environment } from 'src/environments/environment';
import { ContactList } from '../../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _urlBase: string = environment.url;

  constructor(private http: HttpClient) {}

  createContact(data: CreateContact): Observable<MessageContact> {
    return this.http.post<MessageContact>(
      `${this._urlBase}/contact/create`,
      data
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.http
      .get<ContactList>(`${this._urlBase}/contact/list`)
      .pipe(map((resp) => resp.data));
  }

  updateContact(isActive: boolean, id: string): Observable<MessageContact> {
    return this.http.put<MessageContact>(`${this._urlBase}/contact/${id}`, {
      isActive,
    });
  }
}
