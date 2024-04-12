import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private readonly analyticsBaseUrl = 'https://analyticsreporting.googleapis.com/v4/reports:batchGet';
  private accessToken: string | undefined;
  private headers: HttpHeaders | undefined;
  private requestBody: any;

  constructor(private http: HttpClient, private authService: SocialAuthService) { }

  getRealTimeData(propertyId: string, metrics: string[]): Observable<any> {
    const requestBody = {
      reportRequests: [
        {
          viewId: 'ga:' + propertyId,
          dateRanges: [
            {
              startDate: 'today',
              endDate: 'today'
            }
          ],
          metrics: metrics.map(metric => ({ expression: metric }))
        }
      ]
    };

    return new Observable<any>((observer) => {
      this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
        console.log(accessToken, 'access token from service');
        this.accessToken = accessToken;
        this.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        });
        this.requestBody = requestBody;

        console.log(this.headers);
        console.log(this.requestBody);

        this.http.post<any>(this.analyticsBaseUrl, this.requestBody, { headers: this.headers })
          .subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
              observer.complete();
            }
          );
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
