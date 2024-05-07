import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Version } from '../../../models/Version';
import { VersionService } from '../../../services/version.service';

@Component({
  selector: 'app-details-version-provider',
  templateUrl: './details-version-provider.component.html',
  styleUrl: './details-version-provider.component.css'
})
export class DetailsVersionProviderComponent {
  constructor(private versionService:VersionService,private route:ActivatedRoute){}
  idModel!:number;
  version!:Version;
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.idModel=param['id']
    })
    this.versionService.getVersion(this.idModel).subscribe(response=>{
      console.log(response);
      this.version=response
    },(error)=>{
      console.log(error);
    })
   }
}
