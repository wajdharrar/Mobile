import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';
import { Request } from '../models/Request';

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
}
