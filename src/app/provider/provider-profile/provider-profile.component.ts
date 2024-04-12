import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ProviderService } from '../../services/provider.service';
import { Partner } from '../../models/Partner';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css'
})
export class ProviderProfileComponent implements OnInit {
  user!:User;
  manager!:Partner;
  constructor(private authService:AuthService,private route:Router,private providerService:ProviderService){}
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
 ngAfterViewInit(){
  
 }
}

