import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  currentUser: User | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.currentUser = this.auth.currentUserValue;
    const expectedRole = route.data.expectedRole;

    if (!this.currentUser || this.currentUser.role < expectedRole) {
      this.router.navigate(['forbidden']);
      return false;
    }
    return true;
  }

}
