import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { Brand } from '../../models/Brand';
import { Model } from '../../models/Model';
import { Version } from '../../models/Version';
import { User } from '../../models/User';
import { BrandService } from '../../services/brand.service';
import { ModelService } from '../../services/model.service';
import { VersionService } from '../../services/version.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-provider-product',
  templateUrl: './provider-product.component.html',
  styleUrl: './provider-product.component.css'
})
export class ProviderProductComponent {
  user!:User;
  brands!:Brand[];
  IdUser:number;
  models!:Model[];
  versions!:Version[];
  lengthBrands!:number;
  activeTab: string = 'brand';
  constructor(
              private authService:AuthService,
              private brandService:BrandService,
              private versionService:VersionService,
              private modelService:ModelService){}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      this.IdUser=response.idUtilisateur
      this.brandService.getBrandsByPartner(this.IdUser).subscribe(response=>{
        console.log(response)
        this.brands=response
        this.lengthBrands=this.brands.length
        this.modelService.getModelsByPartner(this.IdUser).subscribe(response=>{
          console.log(response);
          this.models=response
         },
        error=>{
          console.log(error);
        })
        this.versionService.getVersionsByPartner(this.IdUser).subscribe(response=>{
          console.log(response);
          this.versions=response
         },
        error=>{
          console.log(error);
        })
     },(error)=>{
      console.log(error)
     })
    })
  }
  switchTab(tab: string) {
    this.activeTab = tab;
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
