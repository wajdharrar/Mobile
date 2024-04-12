import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl='http://localhost:8080';
  constructor(private http : HttpClient) { }
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
    }
    getPartners(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}/user/partner`);
    }
    getClients(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}/user/client`);
    }
    getUser(userId:number|undefined): Observable<User> {
      return this.http.get<User>(`${this.apiServerUrl}/user/${userId}`);
    }
    addUser(user:User):Observable<User>{
      return this.http.post<User>(`${this.apiServerUrl}/user/add`,user);
    }
    updateUser(id:number,user:User):Observable<User>{
      return this.http.put<User>(`${this.apiServerUrl}/user/update/${id}`,user);
    }
    deleteUser(userId:number|undefined):Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
    }
    updateState(userId:number,user:User):Observable<User>{
      return this.http.put<User>(`${this.apiServerUrl}/user/state/${userId}`,user);
    }
    updatePassword(userId:number,user:User):Observable<User>{
      return this.http.put<User>(`${this.apiServerUrl}/user/password/${userId}`,user);
    }
}
