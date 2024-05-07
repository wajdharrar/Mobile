import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../models/User';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';
import { State } from '../../enum/State';
import { ModelService } from '../../services/model.service';
import { Model } from '../../models/Model';
import { VersionService } from '../../services/version.service';
import { Version } from '../../models/Version';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  user!:User;
  partners: User[] = [];
  partnersModel: User[] = [];
  brands!:Brand[];
  models!:Model[];
  versions!:Version[];
  lengthBrands!:number;
  activeTab: string = 'brand';
  constructor(private authService:AuthService,
              private userService:UserService,
              private brandService:BrandService,
              private versionService:VersionService,
              private modelService:ModelService){}
  ngOnInit(): void {
     this.brandService.getBrands().subscribe(response=>{
        console.log(response)
        this.brands=response
        this.lengthBrands=this.brands.length
        for (let index = 0; index < this.brands.length; index++) {
          const element = this.brands[index].idPartner;
          this.userService.getUser(element).subscribe(response=>{
            this.brands[index].namePartner=response.name
          })
        }
        console.log(this.partners)
     },(error)=>{
      console.log(error)
     })
     this.modelService.getModels().subscribe(response=>{
      console.log(response);
      this.models=response
      for (let index = 0; index < this.models.length; index++) {
        const element = this.models[index];
        this.modelService.getPartnerIds(element.idModel).subscribe(response=>{
            this.userService.getUser(response).subscribe(response=>{
              element.namePartner=response.name
            })
        })
      }
      
     },
    error=>{
      console.log(error);
    })
    this.versionService.getVersions().subscribe(response=>{
      console.log(response);
      this.versions=response
      for (let index = 0; index < this.versions.length; index++) {
        const element = this.versions[index];
        this.versionService.getPartnerIds(element.idVersion).subscribe(response=>{
          console.log(response)
            this.userService.getUser(response).subscribe(response=>{
              element.namePartner=response.name
            })
        })
      }
     },
    error=>{
      console.log(error);
    })
  }
  switchTab(tab: string) {
    this.activeTab = tab;
  }
  onValidateBrand(id:number,brand:Brand){
    if(brand.state!==State.Valid){
      brand.state=State.Valid
      this.brandService.updateState(id,brand).subscribe(respnse=>{
        Swal.fire('Valid!', 'Brand has been Validated.', 'success');
      },(error)=>{
        Swal.fire('Error!', 'Failed to Validate Brand.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Brand Already Valid.', 'error');
    }
  }
  onRejectBrand(id:number,brand:Brand){
    if(brand.state!==State.Rejected){
      brand.state=State.Rejected
      this.brandService.updateState(id,brand).subscribe(respnse=>{
        Swal.fire('Rejected!', 'Brand has been Rejected.', 'success');
      },(error:any)=>{
        Swal.fire('Error!', 'Failed to Reject Brand.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Brand Already Rejected.', 'error');
    }
  }
  onDeleteeBrand(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this brand. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deleteBrand(id).subscribe(response => {
          Swal.fire('Deleted!', 'Brand has been deleted.', 'success');
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
  onValidateModel(idModel:number,model:Model){
    if(model.state!==State.Valid){
      model.state=State.Valid
      this.modelService.updateState(idModel,model).subscribe(respnse=>{
        Swal.fire('Valid!', 'Model has been Validated.', 'success');
      },(error)=>{
        Swal.fire('Error!', 'Failed to Validate Model.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Model Already Valid.', 'error');
    }
  }
  onRejectModel(idModel:number,model:Model){
    if(model.state!==State.Rejected){
      model.state=State.Rejected
      this.modelService.updateState(idModel,model).subscribe(respnse=>{
        Swal.fire('Rejected!', 'Model has been Rejected.', 'success');
      },(error:any)=>{
        Swal.fire('Error!', 'Failed to Reject Model.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Model Already Rejected.', 'error');
    }
  }
  onDeleteeModel(idModel:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this model. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modelService.deleteModel(idModel).subscribe(response => {
          Swal.fire('Deleted!', 'Model has been deleted.', 'success');
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
  onValidateVersion(idVersion:number,version:Version){
    if(version.state!==State.Valid){
      version.state=State.Valid
      this.versionService.updateState(idVersion,version).subscribe(respnse=>{
        Swal.fire('Valid!', 'Version has been Validated.', 'success');
      },(error)=>{
        Swal.fire('Error!', 'Failed to Validate Version.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Version Already Valid.', 'error');
    }
  }
  onRejectVersion(idVersion:number,version:Version){
    if(version.state!==State.Rejected){
      version.state=State.Rejected
      this.versionService.updateState(idVersion,version).subscribe(respnse=>{
        Swal.fire('Rejected!', 'Version has been Rejected.', 'success');
      },(error:any)=>{
        Swal.fire('Error!', 'Failed to Reject Version.', 'error');
      })
    }else{
      Swal.fire('Error!', 'Version Already Rejected.', 'error');
    }
  }
  onDeleteeVersion(idVersion:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this model. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.versionService.deleteVersion(idVersion).subscribe(response => {
          Swal.fire('Deleted!', 'Model has been deleted.', 'success');
        }, error => {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
      }
    });
  }
}