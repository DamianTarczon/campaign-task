import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Options from '../../models/options.model';
import Campaign from '../../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  post<T>(url: string, body: Campaign): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }

  put<T>(url: string, body: Campaign): Observable<T> {
    return this.httpClient.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
