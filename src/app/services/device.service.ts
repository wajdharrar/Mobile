import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Phone } from '../models/Phone';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiServerUrl='http://localhost:8080/device';
  constructor(private http : HttpClient) { }
  getRequests(): Observable<Phone[]> {
    return this.http.get<Phone[]>(`${this.apiServerUrl}/all`);
  }
}
