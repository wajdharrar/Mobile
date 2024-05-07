import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { Version } from '../../../models/Version';
import { Model } from '../../../models/Model';
import { User } from '../../../models/User';
import { FileService } from '../../../services/file.service';
import { ModelService } from '../../../services/model.service';
import { VersionService } from '../../../services/version.service';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand.service';
import { FeatureService } from '../../../services/feature.service';
import { Feature } from '../../../models/Feauture';
import { DeviceType } from '../../../models/DeviceType';
import { DeviceTypeService } from '../../../services/device-type.service';
import { FeatureVersionService } from '../../../services/feature-version.service';
import { ValueService } from '../../../services/value.service';
import { Value } from '../../../models/Value';
import { FeatureValue } from '../../../models/tools/FeatureValue';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrls: ['./add-version.component.css']
})
export class AddVersionComponent {
  version = {
    nameVersion: '',
    descVersion: '',
    imgVersion: '',
    model: {
      nameModel: '',
      descModel: '',
      imgModel: '',
      brand: {
        nameBrand: '',
        descBrand: '',
        logoBrand: '',
        state: State.Valid
      },
      state: State.Valid
    },
    state: State.Valid
  };
  partners:User[]
  partnerSelected:number
  user!: User;
  selectedFile!: File | null;
  uploadProgress!: number;
  brands!: Brand[];
  brandSelected!: number;
  models!: Model[];
  modelSelected!: number;
  features: Feature[] = [];
  deviceTypes!: DeviceType[];
  deviceTypeSelected!: number;
  values: { [key: number]: Value[] } = {};
  selectedValues: { [key: number]: string } = {};
  selectedValuesToSave: FeatureValue[] = []; // Initialize selectedValuesToSave array
  featuresSelected!:any[]
  activeTab: string = 'version';
  versionSaved!:Version;
  constructor(
    private userService:UserService,
    private route: Router,
    private modelService: ModelService,
    private fileService: FileService,
    private versionService: VersionService,
    private brandService: BrandService,
    private featureService: FeatureService,
    private deviceTypeService: DeviceTypeService,
    private featureVersionService: FeatureVersionService,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.userService.getPartners().subscribe(response=>{
      this.partners=response
    },(error) => {
      console.log(error);
    });
    this.deviceTypeService.getDeviceTypes().subscribe(response => {
      console.log(response);
      this.deviceTypes = response;
    },
      (error) => {
        console.log(error);
      });
  }
  switchTab(tab: string) {
    this.activeTab = tab;
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
  onBrandSelected(brand: number) {
    this.brandService.getBrand(this.brandSelected).subscribe(response => {
      this.modelService.getModelsBybrand(response).subscribe(response => {
        console.log(response);
        this.models = response;
      },
        (error) => {
          console.log(error);
        });
    });
  }

  onDeviceTypeSelected(deviceType: number) {
    this.featureService.getFeatureByDeviceType(deviceType).subscribe(
      (response) => {
        console.log(response);
        this.features = response;
        this.features.forEach(feature => {
          this.valueService.getValuesByFeature(feature).subscribe(
            (values) => {
              console.log(values);
              this.values[feature.idFeature] = values;
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFeaturesSelected(value: any, featureId: number) {
    console.log("Selected value: ", value);
    console.log("Feature ID: ", featureId);
    console.log(this.selectedValues);
    const featureValue: FeatureValue = {
      idFeature: featureId,
      value: value,
    };
    this.selectedValuesToSave.push(featureValue);
    console.log(this.selectedValuesToSave);
  }

  OnSave() {
    this.brandService.getBrand(this.brandSelected).subscribe(response => {
      this.version.model.brand = response;
      this.modelService.getModel(this.modelSelected).subscribe(response => {
        this.version.model = response;
        this.versionService.addVersion(this.version).subscribe(response => {
          console.log(response);
          this.versionSaved=response
          this.onUploadFile(response);
          Swal.fire({
            title: 'Success!',
            text: 'Version added successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }, (error) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add Version',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        });
      });
    });
    this.route.navigate(["admin/product/version#feature"]);
  }
  OnSaveFeature(){
    if(this.versionSaved!=undefined){
      this.featureVersionService.addFeaturesToVersion(this.versionSaved.idVersion, this.selectedValuesToSave).subscribe(response => {
        console.log(response);
        Swal.fire({
          title: 'Success!',
          text: 'Features added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.route.navigate(["admin/product"]);
      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: 'Failure could not add features to version delete version',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Add Version First',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  onUploadFile(user: Version) {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile, user.idVersion, 'version').subscribe((progress) => {
        this.uploadProgress === progress;
        if (progress === 100) {
          Swal.fire({
            title: "success !",
            text: 'file uploaded successfuly',
            icon: 'success',
            confirmButtonText: 'ok'
          });
          this.selectedFile = null;
        } else {
          Swal.fire({
            title: "Error !",
            text: 'failed to upload file',
            icon: 'error',
            confirmButtonText: 'ok'
          });
        }
      });
    }
  }
}
