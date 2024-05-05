import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registerForm!: FormGroup;
  role:any;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private authService:AuthService ,private fb:FormBuilder,private route:Router,private fileService:FileService){
    this.role={
      idRole: 3,
      nameRole:"client"
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required, Validators.minLength(6)]],
      confirmmdp: ['', [Validators.required, Validators.minLength(6)]],
      img: ['', Validators.required],
      stateUser: ['Active', Validators.required],
      role:[this.role, Validators.required]

    });
  }
  register(){
    console.log(this.registerForm.get('mdp')?.value);
      console.log(this.registerForm.get('confirmmdp')?.value);
    if(this.registerForm.get('mdp')?.value===this.registerForm.get('confirmmdp')?.value){
      console.log(this.registerForm.value);
      this.authService.Register(this.registerForm.value).subscribe(response=>{
        console.log(response)
        this.authService.getUserByToken(response.token).subscribe(response=>{
          console.log(response)
          this.onUploadFile(response)
        this.route.navigate(['/login'])})
      },error=>{
        Swal.fire({
          title:'Error !',
          text:'email already exists',
          icon:'error'
        })
      })
    }else{
      Swal.fire({
        title:'Error !',
        text:'Check your password',
        icon:'error'
      })
    }
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
