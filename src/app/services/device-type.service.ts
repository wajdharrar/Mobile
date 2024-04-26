import { Injectable } from '@angular/core';
import { DeviceType } from '../models/DeviceType';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {

  private apiServerUrl='http://localhost:8080/deviceType';
  constructor(private http : HttpClient) { }
  getDeviceTypes(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>(`${this.apiServerUrl}/all`);
  }
  getDeviceType(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/${id}`);
  }
 }
