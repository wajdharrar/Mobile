import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/User';
import { Version } from '../../../models/Version';
import { FileService } from '../../../services/file.service';
import { VersionService } from '../../../services/version.service';

@Component({
  selector: 'app-update-version-provider',
  templateUrl: './update-version-provider.component.html',
  styleUrl: './update-version-provider.component.css'
})
export class UpdateVersionProviderComponent {
  versionId!:any;
  version!:Version;
  user!:User;
  selectedFile!:File|null;
  uploadProgress!:number;
  constructor(private route:ActivatedRoute,
    private versionService:VersionService,
    private router:Router,
    private fileService:FileService){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.versionId=param['id'];
    })
    console.log(this.versionId)
    this.versionService.getVersion(this.versionId).subscribe(response=>{
      this.version=response;
    })
    }
  OnSave(){
    this.versionService.updateVersion(this.versionId,this.version).subscribe(response=>{
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
    this.router.navigate(["admin/products"]);
  }
  onFileSelected(event:any){
    const fileList:FileList = event.target.files;
    if(fileList && fileList.length>0){
      this.selectedFile=fileList[0];
    }
  }
  onUploadFile(version:Version){
    if(this.selectedFile){
      this.fileService.uploadFile(this.selectedFile,version.idVersion,'version').subscribe((progress)=>{
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
