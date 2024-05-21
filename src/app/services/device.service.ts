import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Device } from '../models/Phone';
import { DeviceType } from '../models/DeviceType';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiServerUrl='http://localhost:8080/device';
  constructor(private http : HttpClient) { }
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiServerUrl}/all`);
  }
  getDevice(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/${id}`);
  }
  countDevicesByState(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/count/state/${id}`);
  }
  countDevicesByBrand(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/count/brand/${id}`);
  }
  countDevicesByDeviceType(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/count/device/${id}`);
  }
  countDevicesByModel(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/count/model/${id}`);
  }
  getDeviceByDeviceType(deviceType:DeviceType):Observable<any[]>{
    return this.http.post<any[]>(`${this.apiServerUrl}/device`,deviceType);
  }
  addDevice(device:any):Observable<Device>{
    return this.http.post<Device>(`${this.apiServerUrl}/add`,device)
  }
  updateDevice(id:number,device:any):Observable<Device>{
    return this.http.put<Device>(`${this.apiServerUrl}/update/${id}`,device);
  }
  deleteDevice(id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
  updateState(id: number, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiServerUrl}/updatestate/${id}`, device);
  }
}
