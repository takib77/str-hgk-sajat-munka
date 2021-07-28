import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  entity: string = 'users';

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.apiUrl}${this.entity}`);
  };

  get(id?: number | string): Observable<User> {
    return this.http.get<User>(`${this.config.apiUrl}${this.entity}/${id}`);
  };

  query(queryString: string): Observable<User | User[]> {
    return this.http.get<User[]>(`${this.config.apiUrl}${this.entity}?${queryString}`);
  }

}
