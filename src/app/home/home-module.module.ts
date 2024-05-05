import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteCarouselComponent } from './infinite-carousel/infinite-carousel.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { DeviceTypeComponent } from './device-type/device-type.component';
import { DetailsDeviceComponent } from './details-device/details-device.component';



@NgModule({
  declarations: [
    InfiniteCarouselComponent,
    ProcedureComponent,
    HomeContentComponent,
    CarouselComponent,
    ProductBoxComponent,
    DeviceTypeComponent,
    DetailsDeviceComponent,

  ],
  imports: [
    CommonModule
  ]
})
export class HomeModuleModule { }
