import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { Brand } from '../../../models/Brand';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { BrandService } from '../../../services/brand.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-add-brand-provider',
  templateUrl: './add-brand-provider.component.html',
  styleUrl: './add-brand-provider.component.css'
})
export class AddBrandProviderComponent {
  brand={
    nameBrand:'',
    descBrand:'',
    logoBrand:'',
    idPartner:0,
    state:State.Pending_Validation
  }
  user!:User;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private authService:AuthService,
    private route:Router,
    private brandService:BrandService,
    private fileService:FileService){  
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
     },(error)=>{
      console.log(error);
      this.route.navigate(['/login']);
      Swal.fire('Error!', 'Session Expired.', 'error');
  })}
  OnSave(){
    this.brand.idPartner=this.user.idUtilisateur
    this.brandService.addBrand(this.brand).subscribe(response=>{
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Brand added successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.onUploadFile(response)

          Swal.fire({
            title: 'Success!',
            text: 'User added successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
    },(error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add Brand',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    })
    this.route.navigate(["admin/product"]);
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
  }
  onUploadFile(user:Brand){
    if(this.selectedFile){
      this.fileService.uploadFile(this.selectedFile,user.idBrand,'brand').subscribe((progress)=>{
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
