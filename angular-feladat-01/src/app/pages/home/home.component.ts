import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userList$: Observable<User[] | any> = this.userservice.getAll();
  tableText = this.config.userColumns;

  constructor(
    private config: ConfigService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
  }

}
