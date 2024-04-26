import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Device } from '../models/Phone';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiServerUrl='http://localhost:8080/device';
  constructor(private http : HttpClient) { }
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiServerUrl}/all`);
  }
  getDevice(id:number):Observable<Device>{
    return this.http.get<Device>(`${this.apiServerUrl}/${id}`);
  }
  addDevice(device:any):Observable<Device>{
    return this.http.post<Device>(`${this.apiServerUrl}/add`,device)
  }
  updatDevice(id:number,device:Device):Observable<Device>{
    return this.http.put<Device>(`${this.apiServerUrl}/update/${id}`,device);
  }
  deleteDevice(id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
  updateState(id: number, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiServerUrl}/updatestate/${id}`, device);
  }
}
