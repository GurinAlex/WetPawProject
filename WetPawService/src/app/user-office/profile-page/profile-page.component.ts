import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  username = '';
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.username = this.auth.getUsername();
    this.auth.profile(this.username).subscribe(userData => {
      this.user = userData;
    });
  }

}
