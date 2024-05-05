import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partner } from '../models/Partner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private apiServerUrl='http://localhost:8080/provider'
  constructor(private http:HttpClient) { }
  addProvider(partner:any):Observable<Partner>{
    return this.http.post<Partner>(`${this.apiServerUrl}/add`,partner)
  }
  getProviderByIdUser(id:number):Observable<Partner>{
    return this.http.get<Partner>(`${this.apiServerUrl}/partner/${id}`);
  }
  updateProvider(id:number,partner:any):Observable<Partner>{
    return this.http.put<Partner>(`${this.apiServerUrl}/update/${id}`,partner)
  }
  deleteProvider(id:number){
    return this.http.delete(`${this.apiServerUrl}/delete/${id}`)
  }
}
