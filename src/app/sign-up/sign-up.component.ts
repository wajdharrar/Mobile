import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registerForm!: FormGroup;
  role:any;
  constructor(private authService:AuthService ,private fb:FormBuilder,private route:Router){
    this.role={
      idRole: 1,
      nameRole:"user"
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      img: ['', Validators.required],
      stateUser: ['Active', Validators.required],
      role:[this.role, Validators.required]

    });
  }
  register(){
    if(this.registerForm.get('password')?.value===this.registerForm.get('confirmPassword')?.value){
      this.authService.Register(this.registerForm.value).subscribe(response=>{
        console.log(response)
        this.route.navigate(['/login'])
      })
    }else{
      console.log("7il 3inik")
    }
  }

}
