import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiServerUrl = "http://localhost:8080/file";

  constructor(private http: HttpClient) { }

  uploadFile(file: File, id: number, type: string): Observable<number> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<any>(`${this.apiServerUrl}/upload/${id}/${type}`, formData, {
      reportProgress: true,
      observe: "events"
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const percentDone = Math.round((event.loaded / event.total) * 100);
          return percentDone;
        } else if (event.type === HttpEventType.Response) {
          return 100;
        }
        return 0; 
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading file:', error);
        return throwError(error); 
      })
    );
  }
  uploadDoc(file: File, id: number, type: string): Observable<number> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<any>(`${this.apiServerUrl}/doc/${id}/${type}`, formData, {
      reportProgress: true,
      observe: "events"
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const percentDone = Math.round((event.loaded / event.total) * 100);
          return percentDone;
        } else if (event.type === HttpEventType.Response) {
          return 100;
        }
        return 0; 
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading file:', error);
        return throwError(error); 
      })
    );
  }
}
