import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ProviderService } from '../../services/provider.service';
import { Partner } from '../../models/Partner';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css'
})
export class ProviderProfileComponent implements OnInit {
  user!:User;
  manager!:Partner;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private authService:AuthService,private route:Router,private providerService:ProviderService,private fileService:FileService){}
  activeTab: string = 'home';

  switchTab(tab: string) {
    this.activeTab = tab;
  }
 ngOnInit(): void {
   this.authService.getUserDetails().subscribe(response=>{
    console.log(response)
    this.user=response
    this.providerService.getProviderByIdUser(this.user.idUtilisateur).subscribe(response=>{
      console.log(response)
      this.manager=response
     },(error)=>{
      console.log(error);
     })
   },(error)=>{
    console.log(error);
    this.route.navigate(['/login']);
    Swal.fire('Error!', 'Session Expired.', 'error');
   })
 }
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

