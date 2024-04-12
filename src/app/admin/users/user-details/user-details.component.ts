import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { RequestService } from '../../../services/request.service';
import { Request } from '../../../models/Request';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
  id:any;
  user!:User;
  requests!:Request[];
  constructor(private route:ActivatedRoute,private userService:UserService,private requestService:RequestService,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.id=param['id'];
    })
    this.userService.getUser(this.id).subscribe(response=>{
      this.user=response
      this.requestService.getUsers(this.user).subscribe((response:any)=>{
        console.log(response)
        this.requests=response
      },(error)=>{
        console.log(error)
      }
      )
    })
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.router.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');})
  }
 

}
