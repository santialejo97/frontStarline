import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  GetListService,
  GetService,
  service,
} from 'src/app/interfaces/star.interface';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class StartServiceService {
  private _urlBase: string = environment.url;

  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  getListServices(): Observable<service[]> {
    return this.http
      .get<GetListService>(`${this._urlBase}/service/listService`, {
        headers: this.auth.getHeaders(),
      })
      .pipe(
        map((resp) => {
          return resp.data;
        })
      );
  }

  getService(id: string): Observable<service> {
    return this.http
      .get<GetService>(`${this._urlBase}/service/getService/${id}`, {
        headers: this.auth.getHeaders(),
      })
      .pipe(
        map((resp) => {
          return resp.servicio;
        })
      );
  }

  editService(
    id: string,
    data: {
      name: string;
      descripcion: string;
      precio: string;
      isactive: boolean;
    }
  ): Observable<{ ok: boolean; msg: string }> {
    return this.http.put<{ ok: boolean; msg: string }>(
      `${this._urlBase}/service/updateService/${id}`,
      data,
      { headers: this.auth.getHeaders() }
    );
  }
  deleteService(id: string): Observable<{ ok: boolean; msg: string }> {
    return this.http.delete<{ ok: boolean; msg: string }>(
      `${this._urlBase}/service/deletService/${id}`,
      {
        headers: this.auth.getHeaders(),
      }
    );
  }

  createService() {}
}
