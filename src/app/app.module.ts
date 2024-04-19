import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideComponent } from './side/side.component';
import { AdminComponent } from './admin/admin.component';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AdminModule } from './admin/admin.module';
import { ProviderComponent } from './provider/provider.component';
import { ClientComponent } from './client/client.component';
import { SideClientComponent } from './side-client/side-client.component';
import { SideProviderComponent } from './side-provider/side-provider.component';
import { HomeComponent } from './home/home.component';
import { PasswordComponent } from './password/password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ClientModuleModule } from './client/client-module.module';
import { ProviderModuleModule } from './provider/provider-module.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    SideComponent,
    AdminComponent,
    ProviderComponent,
    ClientComponent,
    SideClientComponent,
    SideProviderComponent,
    HomeComponent,
    PasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    BrowserModule,
    AdminModule,
    ClientModuleModule,
    ProviderModuleModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('418103189835-v0gvqeoo46ta2i9ok2elp1g2ea1jfdbd.apps.googleusercontent.com', {
              scopes: 'https://www.googleapis.com/auth/analytics.readonly	'
            })
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
