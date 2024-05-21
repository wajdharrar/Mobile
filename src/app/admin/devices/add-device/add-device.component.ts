import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { Brand } from '../../../models/Brand';
import { Model } from '../../../models/Model';
import { Version } from '../../../models/Version';
import { User } from '../../../models/User';
import { BrandService } from '../../../services/brand.service';
import { FileService } from '../../../services/file.service';
import { ModelService } from '../../../services/model.service';
import { VersionService } from '../../../services/version.service';
import { DeviceTypeService } from '../../../services/device-type.service';
import { DeviceType } from '../../../models/DeviceType';
import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/Phone';
import { UserService } from '../../../services/user.service';
import { ProviderDeviceService } from '../../../services/provider-device.service';
import { ProviderService } from '../../../services/provider.service';
import { ProviderDevice } from '../../../models/ProviderDevice';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
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
  selectedFile!:File|null;
  uploadProgress!:number;
  brands!:Brand[];
  brandSelected:number;
  models!:Model[];
  partners!:User[]
  partner!:any;
  deviceAdded:Device;
  modelSelected:number;
  versions!:Version[];
  versionSelected:number;
  partnerSelected:number;
  providerDevice: ProviderDevice = {
    id: {
      idProvider: 0, // Initialize with appropriate default value
      idDevice: 0, // Initialize with appropriate default value
    },
    createdAt:''
  };
  deviceTypes!:DeviceType[];
  deviceTypeSelected:number;
  constructor(
    private route:Router,
    private userService:UserService,
    private providerService:ProviderService,
    private providerDeviceService:ProviderDeviceService,
    private modelService:ModelService,
    private fileService:FileService,
    private versionService:VersionService,
    private brandService:BrandService,
    private deviceTypeService:DeviceTypeService,
    private deviceService:DeviceService,
  ){}
  ngOnInit(): void {
    this.userService.getPartners().subscribe(response=>{
      this.partners=response
    }
  )
  this.deviceTypeService.getDeviceTypes().subscribe(response=>{
    console.log(response);
    this.deviceTypes=response
  },
(error)=>{
  console.log(error);
})
  }
  OnPartnerSelected(){
    this.brandService.getBrandsByPartner(this.partnerSelected).subscribe(response=>{
      console.log(response);
      this.brands=response
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
          this.deviceAdded=response
          Swal.fire({
            title: 'Success!',
            text: 'device added successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.onUploadFile(response)
          this.providerService.getProviderByIdUser(this.partnerSelected).subscribe(response=>{
            this.partner=response
            console.log(this.partner)
            this.providerDevice.id.idProvider=response.idProvider
            this.providerDevice.id.idDevice=this.deviceAdded.idDevice
            this.providerDevice.createdAt=today.toISOString().substring(0, 10)
            console.log(this.providerDevice)
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
