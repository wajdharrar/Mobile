import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { DetailsRequestClientComponent } from './my-requests/details-request-client/details-request-client.component';
import { UpdateRequestClientComponent } from './my-requests/update-request-client/update-request-client.component';



@NgModule({
  declarations: [
    ClientDashboardComponent,
    ProfileComponent,
    MyRequestsComponent,
    UpdateProfileComponent,
    DetailsRequestClientComponent,
    UpdateRequestClientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class ClientModuleModule { }
