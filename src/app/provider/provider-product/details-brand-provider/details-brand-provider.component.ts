import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-details-brand-provider',
  templateUrl: './details-brand-provider.component.html',
  styleUrl: './details-brand-provider.component.css'
})
export class DetailsBrandProviderComponent {
  constructor(private brandService:BrandService,private route:ActivatedRoute){}
  idBrand!:number;
  brand!:Brand;
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.idBrand=param['id']
    })
    this.brandService.getBrand(this.idBrand).subscribe(response=>{
      console.log(response);
      this.brand=response
    },(error)=>{
      console.log(error);
    })
   }
}
