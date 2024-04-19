import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileService } from '../../services/file.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user!:User;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private authService:AuthService,private route:Router,private fileService:FileService){}
 ngOnInit(): void {  
  this.authService.getUserDetails().subscribe(response=>{
    console.log(response)
    this.user=response
   },(error)=>{
    console.log(error);
 })}
 onFileSelected(event:any){
  const fileList:FileList = event.target.files;
  if(fileList && fileList.length>0){
    this.selectedFile=fileList[0];
  }
  this.onUploadFile(this.user)
}
onUploadFile(user:User){
  if(this.selectedFile){
    this.fileService.uploadFile(this.selectedFile,user.idUtilisateur,'user').subscribe((progress)=>{
      this.uploadProgress===progress
      if(progress===100){
        Swal.fire({
          title:"success !",
          text:'file uploaded successfuly',
          icon:'success',
          confirmButtonText:'ok'
        })
        this.selectedFile=null
      }else{
        Swal.fire({
          title:"Error !",
          text:'failed to upload file',
          icon:'error',
          confirmButtonText:'ok'
        })
      }
    })    
  }
}
}
