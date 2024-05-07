import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model } from '../../../models/Model';
import { ModelService } from '../../../services/model.service';

@Component({
  selector: 'app-details-model-provider',
  templateUrl: './details-model-provider.component.html',
  styleUrl: './details-model-provider.component.css'
})
export class DetailsModelProviderComponent {
  constructor(private modelService:ModelService,private route:ActivatedRoute){}
  idModel!:number;
  model!:Model;
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.idModel=param['id']
    })
    this.modelService.getModel(this.idModel).subscribe(response=>{
      console.log(response);
      this.model=response
    },(error)=>{
      console.log(error);
    })
   }
}
