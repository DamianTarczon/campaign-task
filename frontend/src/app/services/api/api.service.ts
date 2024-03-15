import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Options from '../../models/options.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  post<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, options);
  }

  put<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, options);
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options);
  }
}
