import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Partner } from '../../models/Partner';
import { User } from '../../models/User';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent {
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
