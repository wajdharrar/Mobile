import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';
import { State } from '../../enum/State';

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
  onValidateBrand(id:number,brand:Brand){
    if(brand.state!==State.Valid){
      brand.state=State.Valid
      this.brandService.updateState(id,brand).subscribe(respnse=>{
        Swal.fire('Valid!', 'Brand has been Validated.', 'success');
      },(error)=>{
        Swal.fire('Error!', 'Failed to Validate Brand.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Brand Already Valid.', 'error');
    }
  }
  onRejectBrand(id:number,brand:Brand){
    if(brand.state!==State.Rejected){
      brand.state=State.Rejected
      this.brandService.updateState(id,brand).subscribe(respnse=>{
        Swal.fire('Rejected!', 'Brand has been Rejected.', 'success');
      },(error:any)=>{
        Swal.fire('Error!', 'Failed to Reject Brand.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Brand Already Rejected.', 'error');
    }
  }
  onDeleteeBrand(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this brand. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deleteBrand(id).subscribe(response => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
}
