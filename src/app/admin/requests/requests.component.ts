import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Request } from '../../models/Request';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { State } from '../../enum/State';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit{
  requests!:Request[];
  user!:User;
  constructor(private serviceRequest:RequestService,private authService:AuthService,private route :Router){}
  ngOnInit(): void {
    this.serviceRequest.getRequests().subscribe(response=>{
      this.requests=response
      console.log(response);
    },(error)=>{
      console.log(error);
    })
  }
  onValidate(request:Request){
    if(request.state!==State.Valid){
      request.state=State.Valid
      this.serviceRequest.updateRequestState(request).subscribe(respnse=>{
        Swal.fire('Valid!', 'Request has been Validated.', 'success');
      },(error)=>{
        Swal.fire('Error!', 'Failed to Validate Request.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Request Already Valid.', 'error');
    }
  }
  onRefuse(request:Request){
    if(request.state!==State.Rejected){
      request.state=State.Rejected
      this.serviceRequest.updateRequestState(request).subscribe(respnse=>{
        Swal.fire('Rejected!', 'Request has been rejected.', 'success');
      },(error)=>{
        Swal.fire('Error!', 'Failed to rejecte Request.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Request Already rejected.', 'error');
    }
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
