import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../models/Model';

@Component({
  selector: 'app-details-model',
  templateUrl: './details-model.component.html',
  styleUrl: './details-model.component.css'
})
export class DetailsModelComponent {
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
