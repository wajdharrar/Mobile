import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { Brand } from '../../../models/Brand';
import { Model } from '../../../models/Model';
import { User } from '../../../models/User';
import { BrandService } from '../../../services/brand.service';
import { FileService } from '../../../services/file.service';
import { ModelService } from '../../../services/model.service';

@Component({
  selector: 'app-add-model-provider',
  templateUrl: './add-model-provider.component.html',
  styleUrl: './add-model-provider.component.css'
})
export class AddModelProviderComponent {
  model={
    nameModel:'',
    descModel:'',
    imgModel:'',
    brand:{
      nameBrand:'',
      descBrand:'',
      logoBrand:'',
      state:State.Valid
    },
    state:State.Pending_Validation
  }
  user!:User;
  selectedFile!:File|null;
  uploadProgress!:number;
  brands!:Brand[];
  brandSelected:number;
  constructor(
    private route:Router,
    private modelService:ModelService,
    private fileService:FileService,
    private brandService:BrandService
  ){}
  ngOnInit(): void {
    this.brandService.getBrands().subscribe(response=>{
      console.log(response);
      this.brands=response
    },
  (error)=>{
    console.log(error);
  })
  }
  OnSave(){
    this.brandService.getBrand(this.brandSelected).subscribe(response=>{
      this.model.brand=response
      this.modelService.addModel(this.model).subscribe(response=>{
        console.log(response);
        Swal.fire({
          title: 'Success!',
          text: 'Model added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.onUploadFile(response)
            Swal.fire({
              title: 'Success!',
              text: 'Model added successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
      },(error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add Model',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
    })
    this.route.navigate(["admin/product"]);
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
  }
  onUploadFile(user:Model){
    if(this.selectedFile){
      this.fileService.uploadFile(this.selectedFile,user.idModel,'model').subscribe((progress)=>{
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
