import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureVersion } from '../models/FeatureVersion';
import { FeatureValue } from '../models/tools/FeatureValue';

@Injectable({
  providedIn: 'root'
})
export class FeatureVersionService {

  private apiServerUrl='http://localhost:8080/faetureversion';
  constructor(private http : HttpClient) { }
  addFeaturesToVersion(idVersion:number,selectedValues: FeatureValue[]): Observable<FeatureVersion[]> {
    return this.http.post<FeatureVersion[]>(`${this.apiServerUrl}/add/${idVersion}`,selectedValues);
  }
  getAllFeaturesByIdVersion(idVersion:number): Observable<FeatureVersion[]> {
    return this.http.get<FeatureVersion[]>(`${this.apiServerUrl}/${idVersion}`);
  }
}
