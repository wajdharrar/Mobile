import { Component } from '@angular/core';
import { Brand } from '../../../models/Brand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { FileService } from '../../../services/file.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.css'
})
export class UpdateBrandComponent {
  brandId!:any;
  brand!:Brand;
  user!:User;
  partners:User[]
  selectedFile!:File|null;
  partnerSelected:number;
  uploadProgress!:number;
  constructor(private route:ActivatedRoute,
    private brandService:BrandService,
    private userService:UserService,
    private router:Router,
    private fileService:FileService){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.brandId=param['id'];
    })
    console.log(this.brandId)
    this.brandService.getBrand(this.brandId).subscribe(response=>{
      this.brand=response;
    })
    this.userService.getPartners().subscribe(response=>{
      this.partners=response
    }
  )
    }
  OnSave(){
    this.brandService.updateBrand(this.brandId,this.brand).subscribe(response=>{
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'User data updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.onUploadFile(response)
    },(error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update user data',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

    })
    this.router.navigate(["admin/product"]);
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
  }
  onUploadFile(brand:Brand){
    if(this.selectedFile){
      this.fileService.uploadFile(this.selectedFile,brand.idBrand,'brand').subscribe((progress)=>{
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
