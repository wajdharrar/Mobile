import { Component } from '@angular/core';
import { VersionService } from '../../../services/version.service';
import { ActivatedRoute } from '@angular/router';
import { Model } from '../../../models/Model';
import { Version } from '../../../models/Version';

@Component({
  selector: 'app-details-version',
  templateUrl: './details-version.component.html',
  styleUrl: './details-version.component.css'
})
export class DetailsVersionComponent {
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
