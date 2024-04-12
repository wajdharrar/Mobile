import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';



@NgModule({
  declarations: [
    ClientDashboardComponent,
    ProfileComponent,
    MyRequestsComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class ClientModuleModule { }
