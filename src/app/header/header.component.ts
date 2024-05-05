import { Component, OnInit } from '@angular/core';
import { DeviceTypeService } from '../services/device-type.service';
import { DeviceType } from '../models/DeviceType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  deviceTypeSelected:number;
  allDeviceTypes:DeviceType[];
  constructor(private deviceTypeService: DeviceTypeService){}
ngOnInit(): void {
  this.deviceTypeService.getDeviceTypes().subscribe(response=>{
    console.log(response);
    this.allDeviceTypes=response
  })
}
onDeviceTypeSelected(id:number){}
}
