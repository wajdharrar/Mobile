import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feature } from '../models/Feauture';
import { DeviceType } from '../models/DeviceType';


@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private apiServerUrl='http://localhost:8080/feature';
  constructor(private http : HttpClient) { }
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.apiServerUrl}/all`);
  }
  getFeatureByDeviceType(deviceType:number): Observable<Feature[]>{
    return this.http.get<Feature[]>(`${this.apiServerUrl}/device/${deviceType}`);

  }
  getByVersionId(version:number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/version/${version}`);
  }
}
