import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user!:User;
  constructor(private authService:AuthService,private route:Router){}
 ngOnInit(): void {
   this.authService.getUserDetails().subscribe(response=>{
    console.log(response)
    this.user=response
   },(error)=>{
    console.log(error);
    this.route.navigate(['/login']);
    Swal.fire('Error!', 'Session Expired.', 'error');
   })
 }
}
