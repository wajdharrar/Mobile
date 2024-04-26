import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../enum/State';
import { Device } from '../../models/Phone';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  devices!:Device[];
  device!:Device;
  constructor(private deviceService:DeviceService,private authService:AuthService,private route:Router){}

  ngOnInit(): void {
    this.getUsers()    
  }
  getUsers(){
    this.deviceService.getDevices().subscribe(response=>{
      this.devices=response;
      console.log(this.devices);
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
  onActivate(id:number,device:Device){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to Activate this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if(device.state!==State.Valid){
          device.state=State.Valid
          this.deviceService.updateState(id,device).subscribe(response => {
            Swal.fire('Activated!', 'Device has been Validated.', 'success');
            this.getUsers()
          }, error => {
            Swal.fire('Error!', 'Failed to Validate device.', 'error');
          });
        }else{
          Swal.fire('Error!', 'Device Already Valid.', 'error');
        }
      }
    });
  }
  onBan(id:number,device:Device){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to Reject this device.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if(device.state!==State.Rejected){
          device.state=State.Rejected
          this.deviceService.updateState(id,device).subscribe(response => {
            Swal.fire('Rejected!', 'Device has been Rejected.', 'success');
            this.getUsers()
          }, error => {
            Swal.fire('Error!', 'Failed to Reject this Device.', 'error');
          });
        }else{
          Swal.fire('Error!', 'Device Already has been Rejected.', 'error');
        }
      }
    });
  }
  /*searchUsers(key:string){
    const result : User[]=[];
    for(const user of this.users){
      if(user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||user.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||user.role.nameRole.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||user.stateUser.toLowerCase().indexOf(key.toLowerCase())!== -1){
        result.push(user)
      }
    }
    this.users=result;
      if(result.length===0||!key){
          this.getUsers()
      }
  }*/  
}
