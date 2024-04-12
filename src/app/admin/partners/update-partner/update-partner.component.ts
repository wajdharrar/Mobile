import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StateUser } from '../../../enum/StateUser';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';
import { Partner } from '../../../models/Partner';

@Component({
  selector: 'app-update-partner',
  templateUrl: './update-partner.component.html',
  styleUrl: './update-partner.component.css'
})
export class UpdatePartnerComponent {
  userId!:number
  user!:User
  company!:User
  manager!:Partner
  constructor(
    private authService: AuthService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router: Router,
    private partnerService: ProviderService
  ) { }
  ngOnInit(){
    this.route.params.subscribe(param=>{
      this.userId=param['id'];
    })
    console.log(this.userId)
    this.userService.getUser(this.userId).subscribe(response=>{
      this.user=response;
      this.partnerService.getProviderByIdUser(this.user.idUtilisateur).subscribe(response=>{
        console.log(response)
        this.manager=response
       },(error)=>{
        console.log(error);
       })
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
  OnSave(): void {
      console.log(this.user);
      this.userService.updateUser(this.userId,this.user).subscribe(
        (response) => {
          this.company=response;
          console.log(response, 'company details updated');
          this.updateManager();
        },
        (error) => {
          console.log(error);
          this.showErrorAlert('Failed to update Partner company');
        }
      );
  }

  private updateManager(): void {
    this.manager.idUser=this.userId
    this.partnerService.updateProvider(this.userId,this.manager).subscribe(
      (response) => {
        console.log(response, 'manager updated');
        this.showSuccessAlert('Partner updated successfully');
        this.router.navigate(['admin/partners']);
      },
      (error) => {
        console.log(error);
        this.showErrorAlert('Failed to update Partner manager');
      }
    );
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
}
