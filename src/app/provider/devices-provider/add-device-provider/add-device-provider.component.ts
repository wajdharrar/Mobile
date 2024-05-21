import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { Brand } from '../../../models/Brand';
import { DeviceType } from '../../../models/DeviceType';
import { Model } from '../../../models/Model';
import { Device } from '../../../models/Phone';
import { User } from '../../../models/User';
import { Version } from '../../../models/Version';
import { BrandService } from '../../../services/brand.service';
import { DeviceTypeService } from '../../../services/device-type.service';
import { DeviceService } from '../../../services/device.service';
import { FileService } from '../../../services/file.service';
import { ModelService } from '../../../services/model.service';
import { VersionService } from '../../../services/version.service';
import { AuthService } from '../../../services/auth.service';
import { ProviderService } from '../../../services/provider.service';
import { ProviderDeviceService } from '../../../services/provider-device.service';
import { ProviderDevice } from '../../../models/ProviderDevice';

@Component({
  selector: 'app-add-device-provider',
  templateUrl: './add-device-provider.component.html',
  styleUrl: './add-device-provider.component.css'
})
export class AddDeviceProviderComponent {
  device={
    nameDevice:'',
    price:'',
    inventory:'',
    imgDevice:'',
    descDevice:'',
    color:'',
    state:State.Pending_Validation,
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
    selectedFile!:File|null;
    uploadProgress!:number;
    brands!:Brand[];
    brandSelected:number;
    IdUser:number
    IdPartner:number
    models!:Model[];
    modelSelected:number;
    versions!:Version[];
    versionSelected:number;
    deviceTypes!:DeviceType[];
    deviceTypeSelected:number;
    addedDevice:Device
    providerDevice: ProviderDevice = {
      id: {
        idProvider: 0, // Initialize with appropriate default value
        idDevice: 0, // Initialize with appropriate default value
      },
      createdAt:''
    };
    constructor(
      private route:Router,
      private modelService:ModelService,
      private fileService:FileService,
      private versionService:VersionService,
      private brandService:BrandService,
      private deviceTypeService:DeviceTypeService,
      private deviceService:DeviceService,
      private authService:AuthService,
      private providerService:ProviderService,
      private providerDeviceService:ProviderDeviceService
    ){}
    ngOnInit(): void {
      this.authService.getUserDetails().subscribe(response=>{
        this.IdUser=response.idUtilisateur
        this.brandService.getBrandsByPartner(this.IdUser).subscribe(response=>{
          console.log(response)
          this.brands=response
       },(error)=>{
        console.log(error)
       })
      })
    this.deviceTypeService.getDeviceTypes().subscribe(response=>{
      console.log(response);
      this.deviceTypes=response
    },
  (error)=>{
    console.log(error);
  })
    }
    onBrandSelected(brand:number){
      this.brandService.getBrand(this.brandSelected).subscribe(response=>{
        this.device.version.model.brand=response
        this.modelService.getModelsBybrand(response).subscribe(response=>{
          console.log(response);
          this.models=response
        },
      (error)=>{
        console.log(error);
      })
      })
    }
    onModelSelected(model:number){
      this.modelService.getModel(this.modelSelected).subscribe(response=>{
        this.device.version.model=response
        this.versionService.getVersionByModel(response).subscribe(response=>{
          console.log(response);
          this.versions=response
        },
      (error)=>{
        console.log(error);
      })
      })
    }
    onVersionSelected(version:number){
      this.versionService.getVersion(this.versionSelected).subscribe(response=>{
        console.log(response);
        this.device.version=response
      })
    }
    onDeviceTypeSelected(deviceType:number){
      this.deviceTypeService.getDeviceType(this.deviceTypeSelected).subscribe(response=>{
        console.log(response);
        this.device.deviceType=response
      })
    }
    OnSave(){
      const today: Date = new Date();
          this.deviceService.addDevice(this.device).subscribe(response=>{
            console.log(response);
            this.addedDevice=response
            Swal.fire({
              title: 'Success!',
              text: 'device added successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.onUploadFile(response)
                this.providerService.getProviderByIdUser(this.IdUser).subscribe(response=>{
                  this.IdPartner=response.idProvider
                  this.providerDevice.id.idProvider=this.IdPartner
                  this.providerDevice.id.idDevice=this.addedDevice.idDevice
                  this.providerDevice.createdAt=today.toISOString().substring(0, 10)
                  this.providerDeviceService.add(this.providerDevice).subscribe(response=>{
                    console.log(response)
                  })
                })
          },(error)=>{
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add Version',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          })
      this.route.navigate(["provider/device"]);
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
