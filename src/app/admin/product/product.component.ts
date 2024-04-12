import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  user!:User;
  brands!:Brand[];
  activeTab: string = 'brand';
  constructor(private authService:AuthService,private route:Router,private brandService:BrandService){}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
     })
     this.brandService.getBrands().subscribe(response=>{
        console.log(response)
        this.brands=response
     },(error)=>{
      console.log(error)
     })
  }
  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
