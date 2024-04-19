import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../models/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private apiServerUrl='http://localhost:8080/model';
  constructor(private http : HttpClient) { }
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiServerUrl}/all`);
  }
  getModel(id:number): Observable<Model> {
    return this.http.get<Model>(`${this.apiServerUrl}/${id}`);
  }
  addModel(model:any):Observable<Model>{
    return this.http.post<Model>(`${this.apiServerUrl}/add`,model)
  }
  updateModel(id:number,model:Model):Observable<Model>{
    return this.http.put<Model>(`${this.apiServerUrl}/update/${id}`,model);
  }
  deleteModel(id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
  updateState(id: number, model: Model): Observable<Model> {
    return this.http.put<Model>(`${this.apiServerUrl}/updatestate/${id}`, model);
  }
}
