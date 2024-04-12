import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmailDetails } from '../tools/EmailDetails';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private authService:AuthService){}
  email:string = '';
  emailBody={
    recipient:'',
    subject:''
  }
  Email:string="";
  send(){
    console.log(this.Email);
    this.emailBody.recipient=this.Email;
    this.emailBody.subject="reset your password"
    this.authService.sendMail(this.emailBody).subscribe(response=>{
      console.log(response);
    })
  }
}
