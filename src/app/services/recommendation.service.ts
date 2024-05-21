import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Device } from '../models/Phone';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  apiServerUrl="http://localhost:8080/recommendation"
  constructor(private http:HttpClient) { }
  recommendDevicesForUser(user:User):Observable<Device[]>{
    return this.http.post<Device[]>(`${this.apiServerUrl}/devices`,user)  }
}
