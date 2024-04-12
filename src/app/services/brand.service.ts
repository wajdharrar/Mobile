import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Brand } from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiServerUrl='http://localhost:8080/brand';
  constructor(private http : HttpClient) { }
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiServerUrl}/all`);
  }
  addBrand(brand:any):Observable<Brand>{
    return this.http.post<Brand>(`${this.apiServerUrl}/add`,brand)
  }
  updateBrand(id:number,brand:Brand):Observable<Brand>{
    return this.http.put<Brand>(`${this.apiServerUrl}/update/${id}`,brand);
  }
  deleteUser(id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
}
