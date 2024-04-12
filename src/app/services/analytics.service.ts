import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AnalyticsData } from '../tools/AnalyticData';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiServerUrl='http://localhost:8080';
  constructor(private http : HttpClient) { }
  getUsers(): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(`${this.apiServerUrl}/analytic/all`);
  }
  getEvents(): Observable<AnalyticsData[]> {
    return this.http.get<AnalyticsData[]>(`${this.apiServerUrl}/analytic/event`);
  }
  getPage(): Observable<AnalyticsData[]> {
    return this.http.get<AnalyticsData[]>(`${this.apiServerUrl}/analytic/page`);
  }
  getBuyer(): Observable<AnalyticsData[]> {
    return this.http.get<AnalyticsData[]>(`${this.apiServerUrl}/analytic/buyer`);
  }
  getScroll(): Observable<AnalyticsData[]> {
    return this.http.get<AnalyticsData[]>(`${this.apiServerUrl}/analytic/scroll`);
  }
}
