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

  get(id?: number | string): Observable<User | User[]> {
    let url = `${this.config.apiUrl}${this.entity}`;

    if (id) {
      url += `/${id}`
    };

    return this.http.get<User[]>(url);
  };

}
