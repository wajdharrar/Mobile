import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProviderDevice } from '../models/ProviderDevice';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProviderDeviceService {
  private apiServerUrl='http://localhost:8080/providerdevice';
  constructor(private http : HttpClient) { }
  add(providerDevice:ProviderDevice): Observable<ProviderDevice> {
    return this.http.post<ProviderDevice>(`${this.apiServerUrl}/add`,providerDevice);
  }
  getAll(): Observable<ProviderDevice[]> {
    return this.http.get<ProviderDevice[]>(`${this.apiServerUrl}/all`);
  }
}
