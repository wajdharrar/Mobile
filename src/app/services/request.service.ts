import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';
import { Request } from '../models/Request';
import { RequestStateCount } from '../tools/RequestStateCount';
import { RequestDeviceCount } from '../tools/RequestDeviceCount';
import { RequestDeviceTypeCount } from '../tools/RequestDeviceTypeCount';
import { RequestBrandCount } from '../tools/RequestBrandCount';
import { RequestPartnerCount } from '../tools/RequestPartnerCount';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiServerUrl='http://localhost:8080/request';
  constructor(private http : HttpClient) { }
  getUsers(user: User): Observable<Request[]> {
    return this.http.post<Request[]>(`${this.apiServerUrl}/user`, user);
  }
  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiServerUrl}/requests`);
  }
  getTotal(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/total`);
  }
  countRequestForPartner(id:number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/total/partner/${id}`);
  }
  countRequestsTotalForPartner(id:number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/total/requests/${id}`);
  }
  countRequestsByBrandForPartner(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/brand/partner/${id}`);
  }
  countRequestsByDeviceForPartner(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/device/partner/${id}`);
  }
  countRequestsByModelForPartner(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/model/partner/${id}`);
  }
  countRequestsByVersionForPartner(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/version/partner/${id}`);
  }
  countRequestsByStateForUser(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/state/client/${id}`);
  }
  countRequestsByDeviceTypeForPartner(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/devicetype/partner/${id}`);
  }
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/count`);
  }
  getStateCount(): Observable<RequestStateCount[]> {
    return this.http.get<RequestStateCount[]>(`${this.apiServerUrl}/state`);
  }
  getDeviceCount(): Observable<RequestDeviceCount[]> {
    return this.http.get<RequestDeviceCount[]>(`${this.apiServerUrl}/device`);
  }
  getDeviceTypeCount(): Observable<RequestDeviceTypeCount[]> {
    return this.http.get<RequestDeviceTypeCount[]>(`${this.apiServerUrl}/devicetype`);
  }
  getBrandCount(): Observable<RequestBrandCount[]> {
    return this.http.get<RequestBrandCount[]>(`${this.apiServerUrl}/brand`);
  }
  getPartnerCount(): Observable<RequestPartnerCount[]> {
    return this.http.get<RequestPartnerCount[]>(`${this.apiServerUrl}/partner`);
  }
  addRequests(request:Request): Observable<Request> {
    return this.http.post<Request>(`${this.apiServerUrl}/add`,request);
  }
  getRequest(id:number): Observable<Request> {
    return this.http.get<Request>(`${this.apiServerUrl}/${id}`);
  }
  deleteRequest(id:number):Observable<void>{
   return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`)
  }
  updateRequest(request:Request):Observable<Request>{
    return this.http.put<Request>(`${this.apiServerUrl}/update/${request.idRequest}`,request)
  }
  updateRequestState(request:Request):Observable<Request>{
    console.log(request)
    console.log(request.idRequest)
    return this.http.put<Request>(`${this.apiServerUrl}/updatestate/${request.idRequest}`,request)
  }
}
