import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/Role';
import { StateUser } from '../../../enum/StateUser';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    password:'',
    email:'',
    adress:'',
    dob:'',
    img:'',
    stateUser:StateUser.ACTIVE,
    role:{
      idRole:1,
      nameRole:"user"
    }
  }
  password1: any;
  password2: any;
  constructor(private authService:AuthService,private route:Router){  
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  OnSave(){
    if(this.password1==this.password2){
      this.user.password=this.password1;
      console.log(this.user);
      this.authService.Register(this.user).subscribe(response=>{
        console.log(response);
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
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
}
