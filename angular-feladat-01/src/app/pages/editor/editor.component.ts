import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  user: User = new User();

  constructor(
    private userservice: UserService,
    private routes: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routes.params.pipe(
      switchMap(params => this.userservice.get(params.id))
    ).subscribe(
      user => {
        this.user = (user as User);
        this.user.password = '';
      }
    );
  }

  onSubmit(ngForm: NgForm): void {

  }

}