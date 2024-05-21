import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/Phone';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { ProviderDeviceService } from '../../services/provider-device.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent implements OnInit{
  constructor(private deviceService:DeviceService, 
    private providerDeviceService:ProviderDeviceService,
    private googleAnalyticService:GoogleAnalyticsService){}
  allDevices:Device[]
  ngOnInit(): void {
    this.providerDeviceService.getHomeDevices().subscribe(response=>{
      console.log(response);
      this.allDevices=response
    })
  }
  addToCart(device:Device){
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
