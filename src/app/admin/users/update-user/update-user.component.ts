import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  userId!:any;
  user!:User;
  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router,private authService:AuthService){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.userId=param['id'];
    })
    console.log(this.userId)
    this.userService.getUser(this.userId).subscribe(response=>{
      this.user=response;
    })
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.router.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  OnSave(){
    this.userService.updateUser(this.userId,this.user).subscribe(response=>{
      console.log(response);
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
    this.router.navigate(["admin/users"]);
  }
}
