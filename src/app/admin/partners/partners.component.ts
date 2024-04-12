import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { StateUser } from '../../enum/StateUser';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent {
  users!:User[];
  user!:User;
  constructor(private authService:AuthService,private route:Router,private userService:UserService){}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
     })
     this.getUsers()    

  }

  getUsers(){
    this.userService.getPartners().subscribe(response=>{
      this.users=response;
    })
  }
  onDelete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this user. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(response => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.getUsers()
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
  onActivate(id:number,user:User){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to Activate this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if(user.stateUser==StateUser.INACTIVE){
          user.stateUser=StateUser.ACTIVE
          this.userService.updateState(id,user).subscribe(response => {
            Swal.fire('Activated!', 'User has been Activated.', 'success');
            this.getUsers()
          }, error => {
            Swal.fire('Error!', 'Failed to Activate user.', 'error');
          });
        }else{
          Swal.fire('Error!', 'User Already Active.', 'error');
        }
      }
    });
  }
  onBan(id:number,user:User){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to Ban this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if(user.stateUser==StateUser.ACTIVE){
          user.stateUser=StateUser.INACTIVE
          this.userService.updateState(id,user).subscribe(response => {
            Swal.fire('Banned!', 'User has been Banned.', 'success');
            this.getUsers()
          }, error => {
            Swal.fire('Error!', 'Failed to Ban this user.', 'error');
          });
        }else{
          Swal.fire('Error!', 'User Already Banned.', 'error');
        }
      }
    });
  }
  searchUsers(key:string){
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
  }
}
