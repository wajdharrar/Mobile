import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AnalyticsData } from '../tools/AnalyticData';
import { AnalyticPageTab } from '../tools/AnalyticPageTab';
import { AnalyticCityTab } from '../tools/AnalyticCityTab';
import { AnalyticCityTime } from '../tools/AnalyticCityTime';

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
  getPage(): Observable<AnalyticPageTab[]> {
    return this.http.get<AnalyticPageTab[]>(`${this.apiServerUrl}/analytic/page`);
  }
  getBuyer(): Observable<AnalyticsData[]> {
    return this.http.get<AnalyticsData[]>(`${this.apiServerUrl}/analytic/buyer`);
  }
  getScroll(): Observable<AnalyticCityTab[]> {
    return this.http.get<AnalyticCityTab[]>(`${this.apiServerUrl}/analytic/scroll`);
  }
  getCityTime(): Observable<AnalyticCityTime[]> {
    return this.http.get<AnalyticCityTime[]>(`${this.apiServerUrl}/analytic/city/time`);
  }
  getBounce(): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(`${this.apiServerUrl}/analytic/bounce`);
  }
}
