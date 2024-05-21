import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceTypeService } from '../../services/device-type.service';
import { Device } from '../../models/Phone';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrl: './device-type.component.css'
})
export class DeviceTypeComponent implements OnInit{
  constructor(private deviceService:DeviceService,
    private route:ActivatedRoute,
    private googleAnalyticService:GoogleAnalyticsService,
    private deviceTypeService:DeviceTypeService,
    private brandService:BrandService
  ){}
  allDevices:Device[]
  allBrands:Brand[]
  deviceTypeId:number
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.deviceTypeId=param['id']
    })
    this.deviceTypeService.getDeviceType(this.deviceTypeId).subscribe(response=>{
      this.deviceService.getDeviceByDeviceType(response).subscribe(response=>{
        console.log(response)
        this.allDevices=response
      })
    })
    this.brandService.getBrands().subscribe(response=>{
      this.allBrands=response
    })
  }
  addToCart(device:Device){
    console.log(device)
    this.trackClick(device)
    localStorage.setItem(device.nameDevice,device.idDevice.toString())
  }
  trackClick(product:Device){
    const buttons = document.querySelector('.tarck-add-to-cart')
    buttons.addEventListener('click',()=>{
      this.googleAnalyticService.trackEvent('Add to cart',product.nameDevice,product.nameDevice)
    })
  }
}
