import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Value } from '../models/Value';
import { Feature } from '../models/Feauture';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  private apiServerUrl='http://localhost:8080/value';
  constructor(private http : HttpClient) { }
  getValuesByFeature(feature:Feature): Observable<Value[]> {
    console.log(feature);
    return this.http.post<Value[]>(`${this.apiServerUrl}/feature`,feature);
  }
  }
