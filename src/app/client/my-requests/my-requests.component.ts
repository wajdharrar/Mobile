import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Request } from '../../models/Request';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent {
  requests!:Request[];
  user!:User;
  constructor(private serviceRequest:RequestService,private authService:AuthService,private route :Router){}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      this.user=response
      this.serviceRequest.getUsers(this.user).subscribe(response=>{
        this.requests=response
        console.log(response);
      },(error)=>{
        console.log(error);
      })
    })
  }
  onDelete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this model. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceRequest.deleteRequest(id).subscribe(response => {
          Swal.fire('Deleted!', 'Model has been deleted.', 'success');
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
}
