import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cart } from '../models/Cart';
import { Request } from '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiServerUrl='http://localhost:8080/cart';
  constructor(private http : HttpClient) { }
  addToCart(items:Cart[]): Observable<Cart[]> {
    return this.http.post<Cart[]>(`${this.apiServerUrl}/add`,items);
  }
  getByIdRequest(request:Request): Observable<Cart[]> {
    return this.http.post<Cart[]>(`${this.apiServerUrl}/request`,request);
  }
  deleteCart(items:Cart[]):Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/delete`,items)
   }
}
