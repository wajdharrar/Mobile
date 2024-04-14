import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './users/add-user/add-user.component';
import { RequestsComponent } from './requests/requests.component';
import { ProductComponent } from './product/product.component';
import { AddPartnerComponent } from './users/add-partner/add-partner.component';
import { PartnersComponent } from './partners/partners.component';
import { UpdatePartnerComponent } from './partners/update-partner/update-partner.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { DetailsPartnerComponent } from './partners/details-partner/details-partner.component';
import { AddBrandComponent } from './product/add-brand/add-brand.component';
import { UpdateBrandComponent } from './product/update-brand/update-brand.component';
import { DetailsBrandComponent } from './product/details-brand/details-brand.component';
import { AddModelComponent } from './product/add-model/add-model.component';
import { AddVersionComponent } from './product/add-version/add-version.component';
import { UpdateModelComponent } from './product/update-model/update-model.component';
import { UpdateVersionComponent } from './product/update-version/update-version.component';
import { DetailsVersionComponent } from './product/details-version/details-version.component';
import { DetailsModelComponent } from './product/details-model/details-model.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    AddUserComponent,
    RequestsComponent,
    ProductComponent,
    AddPartnerComponent,
    PartnersComponent,
    UpdatePartnerComponent,
    ProfileAdminComponent,
    DetailsPartnerComponent,
    AddBrandComponent,
    UpdateBrandComponent,
    DetailsBrandComponent,
    AddModelComponent,
    AddVersionComponent,
    UpdateModelComponent,
    UpdateVersionComponent,
    DetailsVersionComponent,
    DetailsModelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
