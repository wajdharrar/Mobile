import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/User';
import { FileService } from '../../../services/file.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-profile-provider',
  templateUrl: './update-profile-provider.component.html',
  styleUrl: './update-profile-provider.component.css'
})
export class UpdateProfileProviderComponent {
  userId!:any;
  user!:User;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router,private fileService:FileService){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.userId=param['id'];
    })
    console.log(this.userId)
    this.userService.getUser(this.userId).subscribe(response=>{
      this.user=response;
    })
  }
  OnSave(){
    this.userService.updateUser(this.userId,this.user).subscribe(response=>{
      console.log(response);
      this.onUploadFile(response)
      Swal.fire({
        title: 'Success!',
        text: 'User data updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    },(error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update user data',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

    })
    this.router.navigate(["admin/profile"]);
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
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
