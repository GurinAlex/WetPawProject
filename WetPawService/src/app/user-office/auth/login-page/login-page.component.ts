import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {JwtService} from '../../shared/jwt.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message = '';
  error: Observable<string>;
  constructor(
    private jwt: JwtService,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit() {
    // this.route.queryParams.subscribe((params: Params) => {
    //   if (params['loginAgain']) {
    //     this.message = 'Пожалуйста, введите данные';
    //   } else
    //   if (params['authFailed']) {
    //     this.message = 'Сессия истекла. Введите данные заново';
    //   }
    // });

    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.message === 'Неверный логин или пароль') {
      this.message = '';
    }
    this.submitted = true;
    const user: User = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    this.error = this.auth.error$
    if (this.error) {
      this.submitted = false;
    }
    this.auth.login(user).subscribe((response) => {

      this.form.reset();
      this.router.navigate(['/user', 'profile']);
      this.submitted = false;
      }, () => {
        this.submitted = false;
      });
    }

}
