import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Device } from '../../models/Phone';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';
import { ProviderService } from '../../services/provider.service';
import { ProviderDeviceService } from '../../services/provider-device.service';

@Component({
  selector: 'app-devices-provider',
  templateUrl: './devices-provider.component.html',
  styleUrl: './devices-provider.component.css'
})
export class DevicesProviderComponent {
  devices:Device[]=[];
  device!:Device;
  IdUser:number;
  IdProvider:number
  constructor(private deviceService:DeviceService,
    private authService:AuthService,
    private providerDeviceService:ProviderDeviceService,
    private providerService:ProviderService,
    private route:Router){}

  ngOnInit(): void {
    this.getUsers()    
  }
  getUsers(){
    this.authService.getUserDetails().subscribe(response=>{
      this.IdUser=response.idUtilisateur
      this.providerService.getProviderByIdUser(this.IdUser).subscribe(response=>{
        this.IdProvider=response.idProvider
        console.log(response)
        this.providerDeviceService.getAll().subscribe(response=>{
          console.log(response)
          const IDDevice=response.filter((providerDevice)=>providerDevice.id.idProvider===this.IdProvider)
          console.log(IDDevice)
          console.log(IDDevice.length)
          for (let index = 0; index < IDDevice.length; index++) {
            const element = IDDevice[index].id.idDevice;
            this.deviceService.getDevice(element).subscribe(response=>{
              this.devices.push(response)
            })
          }
        })
      })
    })
  }
  onDelete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Device. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deviceService.deleteDevice(id).subscribe(response => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.getUsers()
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
}
