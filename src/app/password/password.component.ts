import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements OnInit {
  password:string="";
  confirm:string="";
  userId:any;
  user!:User;
  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.userId=params['id']
      this.userService.getUser(this.userId).subscribe(response=>{
        console.log(response);
        this.user=response
      },(error)=>{
        console.log(error);
      })
    })
  }
  save(){
    if(this.password==this.confirm){
      this.user.password=this.password;
      this.userService.updatePassword(this.userId,this.user).subscribe(response=>{
        Swal.fire({
          title: 'Success!',
          text: 'Password set successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/login'])
      },error=>{
        Swal.fire({
          title: 'Error!',
          text: 'Setting new password Failed',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
    }else{
      console.log(this.password);
      console.log(this.confirm);
      Swal.fire({
        title: 'Error!',
        text: 'Check the password',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
}
