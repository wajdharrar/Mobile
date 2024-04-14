import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  user!:User
  constructor(private authService:AuthService,private route:Router){}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
      if(this.user.role.idRole!=2){
        this.route.navigate(['/login']);
        Swal.fire('Error!', 'You Have To Login First.', 'error');
      }
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');})
  }

}
