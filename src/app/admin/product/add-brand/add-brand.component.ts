import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { State } from '../../../enum/State';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {
  brand={
    nameBrand:'',
    descBrand:'',
    logoBrand:'',
    state:State.Valid
  }
  user!:User;
  constructor(private authService:AuthService,private route:Router,private brandService:BrandService){  
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  OnSave(){
    this.brandService.addBrand(this.brand).subscribe(response=>{
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Brand added successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    },(error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add Brand',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    })
    this.route.navigate(["admin/products"]);
  }
}
