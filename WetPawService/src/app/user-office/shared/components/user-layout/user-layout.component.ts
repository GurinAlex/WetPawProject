import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {JwtService} from '../../jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private jwt: JwtService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout(event) {
    event.preventDefault();
    this.jwt.destroyToken();
    this.router.navigate(['/user', 'login']);
  }
}
