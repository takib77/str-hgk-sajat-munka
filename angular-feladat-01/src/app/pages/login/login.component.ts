import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  serverError: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(ngForm: NgForm): void {
    const currentUser = this.auth.currentUserValue;
    this.auth.login(ngForm.value).toPromise().then(
      response => {
        if (currentUser) {
          this.router.navigate(['/']);
        }
      },
      err => {
        this.serverError = err.message;
        const to = setTimeout(() => {
          clearTimeout(to);
          this.serverError = '';
        }, 3000);
      }
    );
  }

}
