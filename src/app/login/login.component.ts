import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { GoogleAuthService } from '../services/google-auth.service';
import { SocialAuthService, SocialUser,GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private router:Router,private authServiceBE:AuthService,private fb:FormBuilder,private googleAuthService: GoogleAuthService,private authService: SocialAuthService,private route:Router){
    this.loginForm=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  
  }
  user!: SocialUser;
  loggedIn!: boolean;
  ngOnInit() {
    localStorage.removeItem("token")
  }
  signOut(): void {
    this.authService.signOut();
  }
  login(){
    this.authServiceBE.Login(this.loginForm.value).subscribe(response=>{
      if(response!=null){
      console.log(response);
      localStorage.setItem("token",response.token)
        if(response.idRole==2){
          this.authServiceBE.setIsLoggedIn(true)
          this.route.navigate(['/admin/dashboard']);
        }else if(response.idRole==1){
          this.authServiceBE.setIsLoggedInClient(true)
          this.route.navigate(['/client/dashboard']);
        }else{
          this.authServiceBE.setIsLoggedInProvider(true)
          this.route.navigate(['/provider/dashboard']);
        }
        }else{
        Swal.fire('Error!', 'You have been Banned.', 'error');
      }
    },(error)=>{
      Swal.fire('Error!', 'cannot connect.', 'error');
    }
    );
  }
  authenticate() {
    this.googleAuthService.authenticate();
  }
  resetPassword(){
    this.route.navigate(['/resetPassword']);
  }

}
