import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/Role';
import { StateUser } from '../../../enum/StateUser';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  
  user={
    name:'',
    lastName:'',
    number:'',
    mdp:'',
    email:'',
    adress:'',
    dob:'',
    img:'',
    stateUser:StateUser.ACTIVE,
    role:{
      idRole:3,
      nameRole:"user"
    }
  }
  userss!:User;
  userSaved!:User;
  password:string=""
  password2:string=""
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private authService:AuthService,private route:Router,private fileService:FileService){  
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.userss=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  OnSave(){
    if(this.password==this.password2){
      this.user.mdp=this.password;
      console.log(this.user);
      this.authService.Register(this.user).subscribe(response=>{
        console.log(response,"token");
        this.authService.getUserByToken(response.token).subscribe(response=>{
          console.log(response)
          this.onUploadFile(response)
          Swal.fire({
            title: 'Success!',
            text: 'User added successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        })
        },(error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add user',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Check the password',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    this.route.navigate(["admin/users"]);
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
