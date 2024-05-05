import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceTypeService } from '../../services/device-type.service';
import { Device } from '../../models/Phone';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrl: './device-type.component.css'
})
export class DeviceTypeComponent implements OnInit{
  constructor(private deviceService:DeviceService,
    private route:ActivatedRoute,
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
}
