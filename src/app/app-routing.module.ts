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
import { AddDeviceComponent } from './admin/devices/add-device/add-device.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { DetailsDeviceComponent } from './home/details-device/details-device.component';
import { UpdateDeviceComponent } from './admin/devices/update-device/update-device.component';
import { DeviceTypeComponent } from './home/device-type/device-type.component';
import { DevicesProviderComponent } from './provider/devices-provider/devices-provider.component';
import { AddDeviceProviderComponent } from './provider/devices-provider/add-device-provider/add-device-provider.component';
import { DetailsDeviceProviderComponent } from './provider/devices-provider/details-device-provider/details-device-provider.component';
import { UpdateDeviceProviderComponent } from './provider/devices-provider/update-device-provider/update-device-provider.component';
import { AddBrandProviderComponent } from './provider/provider-product/add-brand-provider/add-brand-provider.component';
import { DetailsBrandProviderComponent } from './provider/provider-product/details-brand-provider/details-brand-provider.component';
import { UpdateBrandProviderComponent } from './provider/provider-product/update-brand-provider/update-brand-provider.component';
import { AddModelProviderComponent } from './provider/provider-product/add-model-provider/add-model-provider.component';
import { DetailsModelProviderComponent } from './provider/provider-product/details-model-provider/details-model-provider.component';
import { UpdateModelProviderComponent } from './provider/provider-product/update-model-provider/update-model-provider.component';
import { AddVersionProviderComponent } from './provider/provider-product/add-version-provider/add-version-provider.component';
import { DetailsVersionProviderComponent } from './provider/provider-product/details-version-provider/details-version-provider.component';
import { UpdateVersionProviderComponent } from './provider/provider-product/update-version-provider/update-version-provider.component';
import { CartComponent } from './home/cart/cart.component';
import { AddDocumentComponent } from './home/add-document/add-document.component';
import { DetailsRequestClientComponent } from './client/my-requests/details-request-client/details-request-client.component';
import { UpdateRequestClientComponent } from './client/my-requests/update-request-client/update-request-client.component';
import { DetailsRequestComponent } from './admin/requests/details-request/details-request.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeContentComponent
      },
      {
        path:'device/:id',
        component:DeviceTypeComponent
      },
      {
        path:'details/:id',
        component:DetailsDeviceComponent,
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'document/:id',
        component:AddDocumentComponent
      },
  ]
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
        path:'requests/details/:id',
        component:DetailsRequestClientComponent,
      },
      {
        path:'product',
        component:ProductComponent,
      },
      {
        path:'product/brand',
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
        path:'product/model',
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
        path:'product/version',
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
      {
        path:'device/add',
        component:AddDeviceComponent,
      },
      {
        path:'device/details/:id',
        component:DetailsDeviceComponent,
      },
      {
        path:'device/update/:id',
        component:UpdateDeviceComponent,
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
        path:'requests/details/:id',
        component:DetailsRequestClientComponent,        
      },
      {
        path:'requests/update/:id',
        component:UpdateRequestClientComponent,        
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
        path:'product/brand',
        component:AddBrandProviderComponent,
      },
      {
        path:'product/detailsbrand/:id',
        component:DetailsBrandProviderComponent,
      },
      {
        path:'product/updatebrand/:id',
        component:UpdateBrandProviderComponent,
      },
      {
        path:'product/model',
        component:AddModelProviderComponent,
      },
      {
        path:'product/detailsmodel/:id',
        component:DetailsModelProviderComponent,
      },
      {
        path:'product/updatemodel/:id',
        component:UpdateModelProviderComponent,
      },{
        path:'product/version',
        component:AddVersionProviderComponent,
      },
      {
        path:'product/detailsversion/:id',
        component:DetailsVersionProviderComponent,
      },
      {
        path:'product/updateversion/:id',
        component:UpdateVersionProviderComponent,
      },
      {
        path:'device',
        component:DevicesProviderComponent,
      },
      {
        path:'device/add',
        component:AddDeviceProviderComponent,
      },
      {
        path:'device/update/:id',
        component:UpdateDeviceProviderComponent,
      },
      {
        path:'device/details/:id',
        component:DetailsDeviceProviderComponent,
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
      },
      {
        path:'requests/details/:id',
        component:DetailsRequestClientComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
