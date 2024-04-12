import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly clientId = '418103189835-v0gvqeoo46ta2i9ok2elp1g2ea1jfdbd.apps.googleusercontent.com';
  private readonly redirectUri = 'http://localhost:4200/dashboard';
  private readonly scopes = ['https://www.googleapis.com/auth/analytics.readonly']; 

  constructor(private router: Router, private http: HttpClient) { }

  authenticate() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scopes.join(' ')}`;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
  if (code) {
    localStorage.setItem('code',code)
  } else {
    window.location.href = authUrl;
  }
  }

  handleAuthorizationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.search)
    const code = urlParams.get('code');
    console.log(code)
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams();
    if(code){
    params.set('client_id', this.clientId);
    params.set('client_secret', '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');
    params.set('code', code);
    params.set('redirect_uri', this.redirectUri);
    params.set('grant_type', 'authorization_code');
      this.http.post(tokenUrl, params.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .subscribe(
          (response: any) => {
            if (response && response.access_token) {
              const accessToken = response.access_token;
              console.log(response.access_token);
              localStorage.setItem('access_token', accessToken);
              this.router.navigate(['/dashboard']);
            } else {
              console.error('Invalid response format:', response);
              // Handle invalid response format
            }
          },
          (error: any) => {
            console.error('Error occurred during token exchange:', error);
            // Handle error
          }
        );
    } else {
      console.log("Code not found");
    }
    
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }
  clearAccessToken() {
    localStorage.removeItem('access_token');
  }
}