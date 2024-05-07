import { Component } from '@angular/core';
import { State } from '../../../enum/State';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { BrandService } from '../../../services/brand.service';
import { FileService } from '../../../services/file.service';
import { Brand } from '../../../models/Brand';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {
  brand={
    nameBrand:'',
    descBrand:'',
    logoBrand:'',
    idPartner:0,
    state:State.Valid
  }
  user!:User;
  partners:User[];
  selectedFile!:File|null;
  uploadProgress!:number;
  partnerSelected:number;
  activeTab: string = 'brand';
  constructor(private authService:AuthService,
    private userService:UserService,
    private route:Router,
    private brandService:BrandService,
    private fileService:FileService){  
  }
  ngOnInit(): void {
    this.userService.getPartners().subscribe(response=>{
        this.partners=response
      }
    )
  }
  switchTab(tab: string) {
    this.activeTab = tab;
  }
  OnSave(){
    this.brand.idPartner=this.partnerSelected
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
