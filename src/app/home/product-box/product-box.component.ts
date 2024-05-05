import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/Phone';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent implements OnInit{
  constructor(private deviceService:DeviceService){}
  allDevices:Device[]
  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(response=>{
      console.log(response);
      this.allDevices=response
    })
  }
}
