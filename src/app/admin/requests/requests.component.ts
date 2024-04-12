import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Request } from '../../models/Request';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/User';

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
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  onValidate(id:number,request:Request){}
  onRefuse(id:number,request:Request){}
  onDelete(id:number){}
}
