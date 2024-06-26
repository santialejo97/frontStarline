import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';

import {
  LoginAuth,
  RegisterAuth,
  ValidTokenAuth,
} from 'src/app/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _urlBase: string = environment.url;
  private _statusAuth!: string;
  public _headerSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public _roleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private http: HttpClient) {}

  gettoken(): string {
    return localStorage.getItem('token') || '';
  }

  getStatusAuth(): string {
    return this._statusAuth;
  }

  setHeaderSubject(header: boolean) {
    this._headerSubject.next(header);
    localStorage.setItem('header', JSON.stringify(header));
  }

  setRoleSubject(role: boolean) {
    this._roleSubject.next(role);
    localStorage.setItem('role', JSON.stringify(role));
  }

  getHeaders() {
    const headers = new HttpHeaders({ token: this.gettoken() });
    return headers;
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  login(data: { email: string; password: string }): Observable<LoginAuth> {
    return this.http.post<LoginAuth>(`${this._urlBase}/auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.setToken(data.token);
        if (data.usuario.role === 'ADMIN') {
          this.setRoleSubject(true);
        } else {
          this.setRoleSubject(false);
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<RegisterAuth> {
    return this.http.post<RegisterAuth>(`${this._urlBase}/auth/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.setHeaderSubject(false);
    this.setRoleSubject(false);
  }

  validToken(): Observable<boolean> {
    return this.http
      .get<ValidTokenAuth>(`${this._urlBase}/auth/newtoken`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((data) => {
          this.setToken(data.token);
          return data.ok;
        }),
        catchError(() => of(false))
      );
  }
}
