import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${this.config.apiUrl}login`;
  logoutUrl = `${this.config.apiUrl}logout`;
  storageName = 'currentUser';
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  lastToken: string = '';

  constructor(
    private config: ConfigService,
    private userservice: UserService,
    private http: HttpClient,
    private router: Router,
  ) {
    const storedUser = localStorage.getItem(this.storageName);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<User | User[] | null> {
    return this.http.post<{ accesToken: string }>(this.loginUrl, { email: user.email, password: user.password })
      .pipe(switchMap(response => {
        if (response.accesToken) {
          this.lastToken = response.accesToken;
          return this.userservice.query(`email=${user.email}`)
        }
        return of(null);
      }))
      .pipe(tap(user => {
        if (!user) {
          this.clearStorage();
        } else {
          (user as User[])[0].token = this.lastToken;
          localStorage.setItem(this.storageName, JSON.stringify(user));
          this.currentUserSubject.next((user as User[])[0]);
        }
      })
      );
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['login']);
  }

  clearStorage(): void {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(null);
  }

}
