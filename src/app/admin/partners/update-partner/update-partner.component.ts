import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';
import { Partner } from '../../../models/Partner';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-update-partner',
  templateUrl: './update-partner.component.html',
  styleUrl: './update-partner.component.css'
})
export class UpdatePartnerComponent {
  userId!:number
  user!:User
  company!:User
  manager!:Partner
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(
    private authService: AuthService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router: Router,
    private partnerService: ProviderService,
    private fileService:FileService
  ) { }
  ngOnInit(){
    this.route.params.subscribe(param=>{
      this.userId=param['id'];
    })
    console.log(this.userId)
    this.userService.getUser(this.userId).subscribe(response=>{
      this.user=response;
      this.partnerService.getProviderByIdUser(this.user.idUtilisateur).subscribe(response=>{
        console.log(response)
        this.manager=response
       },(error)=>{
        console.log(error);
       })
    })
    }
  OnSave(): void {
      console.log(this.user);
      this.userService.updateUser(this.userId,this.user).subscribe(
        (response) => {
          this.company=response;
          console.log(response, 'company details updated');
          this.onUploadFile(response)
          this.updateManager();
        },
        (error) => {
          console.log(error);
          this.showErrorAlert('Failed to update Partner company');
        }
      );
  }

  private updateManager(): void {
    this.manager.idUser=this.userId
    this.partnerService.updateProvider(this.userId,this.manager).subscribe(
      (response) => {
        console.log(response, 'manager updated');
        this.showSuccessAlert('Partner updated successfully');
        this.router.navigate(['admin/partners']);
      },
      (error) => {
        console.log(error);
        this.showErrorAlert('Failed to update Partner manager');
      }
    );
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
  }
  onUploadFile(user:User){
    if(this.selectedFile){
      this.fileService.uploadFile(this.selectedFile,user.idUtilisateur,'user').subscribe((progress)=>{
        this.uploadProgress===progress
        if(progress===100){
          Swal.fire({
            title:"success !",
            text:'file uploaded successfuly',
            icon:'success',
            confirmButtonText:'ok'
          })
          this.selectedFile=null
        }else{
          Swal.fire({
            title:"Error !",
            text:'failed to upload file',
            icon:'error',
            confirmButtonText:'ok'
          })
        }
      })    
    }
  }
}
