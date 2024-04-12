import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Partner } from '../../../models/Partner';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-details-partner',
  templateUrl: './details-partner.component.html',
  styleUrl: './details-partner.component.css'
})
export class DetailsPartnerComponent {
  user!:User;
  userId!:number;
  manager!:Partner;
  constructor(private userService:UserService,private route:ActivatedRoute,private providerService:ProviderService,private authService:AuthService,private router:Router){}
  activeTab: string = 'home';

  switchTab(tab: string) {
    this.activeTab = tab;
  }
 ngOnInit(): void {
  this.route.params.subscribe(params=>
    this.userId=params['id']
  )
   this.userService.getUser(this.userId).subscribe(response=>{
    console.log(response)
    this.user=response
    this.providerService.getProviderByIdUser(this.userId).subscribe(response=>{
      console.log(response)
      this.manager=response
     },(error)=>{
      console.log(error);
     })
   },(error)=>{
    console.log(error);
   })
   this.authService.getUserDetails().subscribe(response=>{
    console.log(response)
    this.user=response
   },(error)=>{
    console.log(error);
    this.router.navigate(['/login']);
    Swal.fire('Error!', 'Session Expired.', 'error');
 })
}
 
}
