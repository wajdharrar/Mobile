import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteCarouselComponent } from './infinite-carousel/infinite-carousel.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { DeviceTypeComponent } from './device-type/device-type.component';
import { DetailsDeviceComponent } from './details-device/details-device.component';
import { CartComponent } from './cart/cart.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InfiniteCarouselComponent,
    ProcedureComponent,
    HomeContentComponent,
    CarouselComponent,
    ProductBoxComponent,
    DeviceTypeComponent,
    DetailsDeviceComponent,
    CartComponent,
    AddDocumentComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModuleModule { }
