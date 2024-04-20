import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { SideComponent } from './side/side.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { UserDetailsComponent } from './admin/users/user-details/user-details.component';
import { UpdateUserComponent } from './admin/users/update-user/update-user.component';
import { AddUserComponent } from './admin/users/add-user/add-user.component';
import { ClientComponent } from './client/client.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { ProviderComponent } from './provider/provider.component';
import { ProviderDashboardComponent } from './provider/provider-dashboard/provider-dashboard.component';
import { ProviderProductComponent } from './provider/provider-product/provider-product.component';
import { ProviderProfileComponent } from './provider/provider-profile/provider-profile.component';
import { ProviderRequestsComponent } from './provider/provider-requests/provider-requests.component';
import { MyRequestsComponent } from './client/my-requests/my-requests.component';
import { ProfileComponent } from './client/profile/profile.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { ProductComponent } from './admin/product/product.component';
import { HomeComponent } from './home/home.component';
import { AddPartnerComponent } from './admin/users/add-partner/add-partner.component';
import { PasswordComponent } from './password/password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdateProfileComponent } from './client/profile/update-profile/update-profile.component';
import { PartnersComponent } from './admin/partners/partners.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { UpdatePartnerComponent } from './admin/partners/update-partner/update-partner.component';
import { DetailsPartnerComponent } from './admin/partners/details-partner/details-partner.component';
import { AddBrandComponent } from './admin/product/add-brand/add-brand.component';
import { DetailsBrandComponent } from './admin/product/details-brand/details-brand.component';
import { UpdateBrandComponent } from './admin/product/update-brand/update-brand.component';
import { AddModelComponent } from './admin/product/add-model/add-model.component';
import { DetailsModelComponent } from './admin/product/details-model/details-model.component';
import { UpdateModelComponent } from './admin/product/update-model/update-model.component';
import { AddVersionComponent } from './admin/product/add-version/add-version.component';
import { DetailsVersionComponent } from './admin/product/details-version/details-version.component';
import { UpdateVersionComponent } from './admin/product/update-version/update-version.component';
import { DevicesComponent } from './admin/devices/devices.component';
import { UpdateProfileAdminComponent } from './admin/profile-admin/update-profile-admin/update-profile-admin.component';
import { UpdateProfileProviderComponent } from './provider/provider-profile/update-profile-provider/update-profile-provider.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:"password/:id",
    component:PasswordComponent
  },
  {
    path:"resetPassword",
    component:ResetPasswordComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignUpComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'sidebar',
    component:SideComponent
  }
  ,
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,

      },
      {
        path:'users',
        component:UsersComponent,
      },
      {
        path:'users/details/:id',
        component:UserDetailsComponent,
      },
      {
        path:'users/update/:id',
        component:UpdateUserComponent,
      },
      {
        path:'users/add',
        component:AddUserComponent,
      },
      {
        path:'users/addpartner',
        component:AddPartnerComponent,
      },
      {
        path:'requests',
        component:RequestsComponent,
      },
      {
        path:'product',
        component:ProductComponent,
      },
      {
        path:'product/addbrand',
        component:AddBrandComponent,
      },
      {
        path:'product/detailsbrand/:id',
        component:DetailsBrandComponent,
      },
      {
        path:'product/updatebrand/:id',
        component:UpdateBrandComponent,
      },
      {
        path:'product/addmodel',
        component:AddModelComponent,
      },
      {
        path:'product/detailsmodel/:id',
        component:DetailsModelComponent,
      },
      {
        path:'product/updatemodel/:id',
        component:UpdateModelComponent,
      },{
        path:'product/addversion',
        component:AddVersionComponent,
      },
      {
        path:'product/detailsversion/:id',
        component:DetailsVersionComponent,
      },
      {
        path:'product/updateversion/:id',
        component:UpdateVersionComponent,
      },
      {
        path:'partners',
        component:PartnersComponent,
      },
      {
        path:'profile',
        component:ProfileAdminComponent,
      },
      {
        path:'profile/update/:id',
        component:UpdateProfileAdminComponent,
      },
      {
        path:'partners/details/:id',
        component:DetailsPartnerComponent,
      },
      {
        path:'partners/update/:id',
        component:UpdatePartnerComponent,
      },
      {
        path:'partners/add',
        component:AddPartnerComponent,
      },
      {
        path:'device',
        component:DevicesComponent,
      },
    ]
  },
  {
    path:'client',
    component:ClientComponent,
    children:[
      {
        path:'dashboard',
        component:ClientDashboardComponent,
      },
      {
        path:'requests',
        component:MyRequestsComponent,        
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'profile/update/:id',
        component:UpdateProfileComponent,
      }
    ]
  },
  {
    path:'provider',
    component:ProviderComponent,
    children:[
      {
        path:'dashboard',
        component:ProviderDashboardComponent,
      },
      {
        path:'product',
        component:ProviderProductComponent,
      },
      {
        path:'profile',
        component:ProviderProfileComponent,
      },
      {
        path:'profile/update/:id',
        component:UpdateProfileProviderComponent,
      },
      {
        path:'requests',
        component:ProviderRequestsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
