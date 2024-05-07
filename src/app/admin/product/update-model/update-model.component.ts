import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileService } from '../../../services/file.service';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../models/Model';
import { State } from '../../../enum/State';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrl: './update-model.component.css'
})
export class UpdateModelComponent {
  modelId!:any;
  model!:Model;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private modelService:ModelService,
    private fileService:FileService){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.modelId=param['id'];
    })
    console.log(this.modelId)
    this.modelService.getModel(this.modelId).subscribe(response=>{
      this.model=response;
    })
    }
  OnSave(){
    this.model.state=State.Pending_Validation
    this.modelService.updateModel(this.modelId,this.model).subscribe(response=>{
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Model data updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.onUploadFile(response)
    },(error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Model data',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

    })
    this.router.navigate(["admin/products"]);
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
  }
  onUploadFile(model:Model){
    if(this.selectedFile){
      this.fileService.uploadFile(this.selectedFile,model.idModel,'model').subscribe((progress)=>{
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
