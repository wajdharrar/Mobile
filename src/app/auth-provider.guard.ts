import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs/internal/Observable";
import Swal from "sweetalert2";

@Injectable({
  providedIn:'root'
})
export class AuthProviderGuard implements CanActivate{
  constructor(private authService:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedInProvider()){
      return true
    }
    else{
      Swal.fire({
        title:"Error !",
        text:"you have to login as a Prtner first",
        icon:'error',
        confirmButtonText:"ok"
      })
      this.router.navigate(['/login'])
      return false
    } 
  }
}
