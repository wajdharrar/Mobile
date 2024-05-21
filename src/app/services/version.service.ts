import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Version } from '../models/Version';
import { Model } from '../models/Model';


@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private apiServerUrl='http://localhost:8080/version';
  constructor(private http : HttpClient) { }
  getVersions(): Observable<Version[]> {
    return this.http.get<Version[]>(`${this.apiServerUrl}/all`);
  }
  getPartnerIds(id:number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/idPartners/${id}`);
  }
  countVersionsByState(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/count/state/${id}`);
  }
  getVersionsByPartner(idPartner:number): Observable<Version[]> {
    return this.http.get<Version[]>(`${this.apiServerUrl}/all/${idPartner}`);
  }
  getVersion(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/${id}`);
  }
  addVersion(version:any):Observable<Version>{
    return this.http.post<Version>(`${this.apiServerUrl}/add`,version)
  }
  updateVersion(id:number,version:Version):Observable<Version>{
    return this.http.put<Version>(`${this.apiServerUrl}/update/${id}`,version);
  }
  deleteVersion(id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
  updateState(id: number, version: Version): Observable<Version> {
    return this.http.put<Version>(`${this.apiServerUrl}/updatestate/${id}`, version);
  }
  getVersionByModel(model:Model): Observable<Version[]> {
    return this.http.post<Version[]>(`${this.apiServerUrl}/all/model`,model);
  }
}
