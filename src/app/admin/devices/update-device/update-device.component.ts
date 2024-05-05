import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { Brand } from '../../../models/Brand';
import { DeviceType } from '../../../models/DeviceType';
import { Model } from '../../../models/Model';
import { Device } from '../../../models/Phone';
import { User } from '../../../models/User';
import { DeviceTypeService } from '../../../services/device-type.service';
import { DeviceService } from '../../../services/device.service';
import { FileService } from '../../../services/file.service';
import { Version } from '../../../models/Version';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrl: './update-device.component.css'
})
export class UpdateDeviceComponent {
  device={
    nameDevice:'',
    price:'',
    inventory:'',
    imgDevice:'',
    descDevice:'',
    color:'',
    state:State.Valid,
    deviceType:{
      idType:'',
      nameType:'',
    },
    version:{
      idVersion:0,
      nameVersion:'',
      descVersion:'',
      imgVersion:'',
      model:{
        idModel:0,
        nameModel:'',
      descModel:'',
      imgModel:'',
      brand:{
        idBrand:0,
        nameBrand:'',
        descBrand:'',
        logoBrand:'',
        state:State.Valid
      },
      state:State.Valid
      },
      state:State.Valid
    },
    sale:{
      idSale: '1',
    }
  }
    user!:User;
    deviceId:number;
    selectedFile!:File|null;
    uploadProgress!:number;
    brands!:Brand[];
    brandSelected:number;
    models!:Model[];
    modelSelected:number;
    versions!:Version[];
    versionSelected:number;
    deviceTypes!:DeviceType[];
    deviceTypeSelected:number;
    constructor(
      private route:Router,
      private router:ActivatedRoute,
      private fileService:FileService,
      private deviceTypeService:DeviceTypeService,
      private deviceService:DeviceService,
    ){}
    ngOnInit(): void {
      this.router.params.subscribe(param=>{
        this.deviceId=param['id'];
      })
      this.deviceService.getDevice(this.deviceId).subscribe(response=>{
        console.log(response);
        this.device=response
      },
      (error)=>{
        console.log(error);
      })
      this.deviceTypeService.getDeviceTypes().subscribe(response=>{
        console.log(response);
        this.deviceTypes=response
      },
      (error)=>{
        console.log(error);
      })
    }
    onDeviceTypeSelected(deviceType:number){
      this.deviceTypeService.getDeviceType(this.deviceTypeSelected).subscribe(response=>{
        console.log(response);
        this.device.deviceType=response
      })
    }
    OnSave(){
          this.deviceService.updateDevice(this.deviceId,this.device).subscribe(response=>{
            console.log(response);
            Swal.fire({
              title: 'Success!',
              text: 'device updated successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.onUploadFile(response)
                Swal.fire({
                  title: 'Success!',
                  text: 'Device updated successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
          },(error)=>{
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update Device',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          })
      this.route.navigate(["admin/device"]);
    }
    onFileSelected(event:any){
      const fileList:FileList = event.target.files;
      if(fileList && fileList.length>0){
        this.selectedFile=fileList[0];
      }
    }
    onUploadFile(user:Device){
      if(this.selectedFile){
        this.fileService.uploadFile(this.selectedFile,user.idDevice,'device').subscribe((progress)=>{
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
