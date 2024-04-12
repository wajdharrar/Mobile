import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiServerUrl="http://localhost:8080/file"
  constructor(private http:HttpClient) { }
  uploadFile(file:File){
    const formData= new FormData();
    formData.append("file",file);
    return this.http.post<number>(`${this.apiServerUrl}/upload`,formData,{
      observe:"events"
    }).pipe(
      map(event=>{
        this.getUploadProgress(event)
      }),
    )
  }
  private getUploadProgress(event:any):number|null{
    if(event.type === HttpEventType.UploadProgress){
      const percentDone=Math.round((event.loaded/event.total)*100);
      return percentDone;
    }
    return null;
  }
}
