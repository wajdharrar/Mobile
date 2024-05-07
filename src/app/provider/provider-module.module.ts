import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { ProviderRequestsComponent } from './provider-requests/provider-requests.component';
import { ProviderProductComponent } from './provider-product/provider-product.component';
import { RouterModule } from '@angular/router';
import { UpdateProfileProviderComponent } from './provider-profile/update-profile-provider/update-profile-provider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDeviceProviderComponent } from './devices-provider/add-device-provider/add-device-provider.component';
import { DetailsDeviceProviderComponent } from './devices-provider/details-device-provider/details-device-provider.component';
import { DevicesProviderComponent } from './devices-provider/devices-provider.component';
import { AddBrandProviderComponent } from './provider-product/add-brand-provider/add-brand-provider.component';
import { AddModelProviderComponent } from './provider-product/add-model-provider/add-model-provider.component';
import { AddVersionProviderComponent } from './provider-product/add-version-provider/add-version-provider.component';
import { DetailsBrandProviderComponent } from './provider-product/details-brand-provider/details-brand-provider.component';
import { DetailsModelProviderComponent } from './provider-product/details-model-provider/details-model-provider.component';
import { DetailsVersionProviderComponent } from './provider-product/details-version-provider/details-version-provider.component';
import { UpdateBrandProviderComponent } from './provider-product/update-brand-provider/update-brand-provider.component';
import { UpdateModelProviderComponent } from './provider-product/update-model-provider/update-model-provider.component';
import { UpdateVersionProviderComponent } from './provider-product/update-version-provider/update-version-provider.component';



@NgModule({
  declarations: [
    ProviderDashboardComponent,
    ProviderProfileComponent,
    ProviderRequestsComponent,
    ProviderProductComponent,
    UpdateProfileProviderComponent,
    AddDeviceProviderComponent,
    DetailsDeviceProviderComponent,
    DevicesProviderComponent,
    DevicesProviderComponent,
    AddBrandProviderComponent,
    AddModelProviderComponent,
    AddVersionProviderComponent,
    DetailsBrandProviderComponent,
    DetailsModelProviderComponent,
    DetailsVersionProviderComponent,
    UpdateBrandProviderComponent,
    UpdateModelProviderComponent,
    UpdateVersionProviderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProviderModuleModule { }
