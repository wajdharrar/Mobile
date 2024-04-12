import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { ProviderRequestsComponent } from './provider-requests/provider-requests.component';
import { ProviderProductComponent } from './provider-product/provider-product.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProviderDashboardComponent,
    ProviderProfileComponent,
    ProviderRequestsComponent,
    ProviderProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ProviderModuleModule { }
