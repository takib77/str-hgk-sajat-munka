import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular-feladat-01';
  nav = this.config.navigation;

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}
