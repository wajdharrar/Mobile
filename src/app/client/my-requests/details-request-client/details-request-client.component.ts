import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { DeviceService } from '../../../services/device.service';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { Device } from '../../../models/Phone';
import { Request } from '../../../models/Request';
import { Document } from '../../../models/Document';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-details-request-client',
  templateUrl: './details-request-client.component.html',
  styleUrl: './details-request-client.component.css'
})
export class DetailsRequestClientComponent implements OnInit {
  constructor(private requestService:RequestService,
    private documentService:DocumentService,
    private deviceService:DeviceService,
    private cartService:CartService,
    private route:ActivatedRoute){}
  request:Request;
  cartItems:Cart[];
  devices:Device[];
  idRequest:number
  documents:Document
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idRequest = params['id'];
      this.requestService.getRequest(this.idRequest).subscribe(response => {
        this.request = response;
        console.log(this.request)
        this.documentService.getByIdRequest(this.request).subscribe(response=>{
          this.documents=response
          console.log(response)
        })
        this.cartService.getByIdRequest(this.request).subscribe(response => {
          this.cartItems = response;
          console.log(this.cartItems)
          const requests = [];
          for (let index = 0; index < this.cartItems.length; index++) {
            const element = this.cartItems[index];
            requests.push(this.deviceService.getDevice(element.device.idDevice));
          }
          forkJoin(requests).subscribe((responses: Device[]) => {
            this.devices = responses;
            console.log(this.devices)
          });
        })
      })
    });
  }
  getFileUrl(file: string): string {
    return 'data:application/pdf;base64,' + file;
  }
}
