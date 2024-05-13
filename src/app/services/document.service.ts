import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/Document';
import { Request } from '../models/Request';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiServerUrl='http://localhost:8080/document';
  constructor(private http : HttpClient) { }
  addDocument(document:Document): Observable<Document> {
    console.log(document)
    return this.http.post<Document>(`${this.apiServerUrl}/add`,document);
  }
  getByIdRequest(request:Request): Observable<Document> {
    return this.http.post<Document>(`${this.apiServerUrl}/request`,request);
  }
  deleteDocument(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`)
  }
}
