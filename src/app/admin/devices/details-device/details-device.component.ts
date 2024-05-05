import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/Phone';

@Component({
  selector: 'app-details-device',
  templateUrl: './details-device.component.html',
  styleUrl: './details-device.component.css'
})
export class DetailsDeviceComponent implements OnInit {
  deviceId:number
  device:Device
  constructor(private router:ActivatedRoute, private deviceService:DeviceService){}
  ngOnInit(): void {
    this.router.params.subscribe(param=>{
      this.deviceId=param['id'];
    })
    this.deviceService.getDevice(this.deviceId).subscribe(response=>{
      console.log(response);
      this.device=response
    },
  (error)=>{
    console.log(error);
  })
  }
}
