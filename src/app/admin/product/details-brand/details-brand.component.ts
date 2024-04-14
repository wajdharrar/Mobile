import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../models/Brand';

@Component({
  selector: 'app-details-brand',
  templateUrl: './details-brand.component.html',
  styleUrl: './details-brand.component.css'
})
export class DetailsBrandComponent implements OnInit{
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
