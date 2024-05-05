import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';

@Component({
  selector: 'app-infinite-carousel',
  templateUrl: './infinite-carousel.component.html',
  styleUrl: './infinite-carousel.component.css'
})
export class InfiniteCarouselComponent implements OnInit{
  allBrands:Brand[]
  constructor(private brandService:BrandService){}
  ngOnInit(): void {
    this.brandService.getBrands().subscribe(response=>{
      console.log(response);
      this.allBrands=response
    }

  )
  }
}
