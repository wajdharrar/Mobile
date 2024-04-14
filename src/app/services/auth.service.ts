import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://localhost:8080/api/v1/auth';
  static isLogged: boolean = false; // Initialize properties with default values
  static isLoggedProvider: boolean = false;
  static isLoggedClient: boolean = false;

  constructor(private http: HttpClient) { }

  Register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/register`, user);
  }

  Login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/login`, user);
  }

  setIsLoggedIn(isLogged: boolean) {
    AuthService.isLogged = isLogged;
  }

  setIsLoggedInProvider(isLogged: boolean) {
    AuthService.isLoggedProvider = isLogged;
  }

  setIsLoggedInClient(isLogged: boolean) {
    AuthService.isLoggedClient = isLogged;
  }

  isLoggedIn(): boolean {
    console.log(AuthService.isLogged);
    return AuthService.isLogged;
  }

  isLoggedInProvider(): boolean {
    return AuthService.isLoggedProvider;
  }

  isLoggedInClient(): boolean {
    console.log(AuthService.isLoggedClient);
    return AuthService.isLoggedClient;
  }

  getUserDetails(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(`${this.apiServerUrl}/userDetails`, { headers });
  }

  sendMail(email: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/password`, email);
  }

  getUserByToken(token: any): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(`${this.apiServerUrl}/userDetails`, { headers });
  }
}
