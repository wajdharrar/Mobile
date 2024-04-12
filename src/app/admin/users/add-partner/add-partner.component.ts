import { Component, OnInit } from '@angular/core';
import { StateUser } from '../../../enum/StateUser';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProviderService } from '../../../services/provider.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit{
  user = {
    name: '',
    lastName: 'none',
    number: '',
    password: '',
    email: '',
    adress: '',
    dob: 'none',
    img: '',
    stateUser: StateUser.ACTIVE,
    role: {
      idRole: 3,
      nameRole: 'partner'
    }
  };
  manager = {
    nameRes: '',
    lastNameRes: '',
    numberRes: '',
    emailRes: '',
    idUser:0
  };
  password: string = '';
  password2: any;
  company!:User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private partnerService: ProviderService
  ) { }
  ngOnInit(){
    console.log(this.password);
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.router.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  OnSave(): void {
    console.log(this.password);
    if (this.password === this.password2) {
      this.user.password = this.password;
      console.log(this.user);

      this.authService.Register(this.user).subscribe(
        (response) => {
          this.company=response;
          console.log(response, 'company details');
          this.addManager();
        },
        (error) => {
          console.log(error);
          this.showErrorAlert('Failed to add Partner company');
        }
      );
    } else {
      console.log(this.password);
      console.log(this.password2);
      this.showErrorAlert('Check password');
    }
  }

  private addManager(): void {
    this.manager.idUser=this.company.idUtilisateur
    this.partnerService.addProvider(this.manager).subscribe(
      (response) => {
        console.log(response, 'manager');
        this.showSuccessAlert('Partner added successfully');
        this.router.navigate(['admin/users']);
      },
      (error) => {
        console.log(error);
        this.showErrorAlert('Failed to add Partner manager');
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
