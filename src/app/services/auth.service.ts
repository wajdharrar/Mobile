import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';
import { EmailDetails } from '../tools/EmailDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl='http://localhost:8080/api/v1/auth';
  isLogged:boolean=false;
  isLoggedProvider:boolean=false;
  isLoggedClient:boolean=false;
  constructor(private http : HttpClient) { }
  Register(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/register`,user);
  }
  Login(user:User):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/login`,user);
  }
  setIsLoggedIn(isLogged:boolean){
    this.isLogged=isLogged
  }
  setIsLoggedInProvider(isLogged:boolean){
    this.isLoggedProvider=isLogged
  }
  setIsLoggedInClient(isLogged:boolean){
    this.isLoggedClient=isLogged
  }
  isLoggedIn(){
    return this.isLogged
  }
  isLoggedInProvider(){
    return this.isLoggedProvider
  }
  isLoggedInClient(){
    return this.isLoggedClient
  }
  getUserDetails(): Observable<User> {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log(headers);
    return this.http.get<User>(`${this.apiServerUrl}/userDetails`, { headers });
  }
  sendMail(email:any):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/password`,email)
  }
  getUserByToken(token:any): Observable<User> {
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log(headers);
    return this.http.get<User>(`${this.apiServerUrl}/userDetails`, { headers });
  }

}
