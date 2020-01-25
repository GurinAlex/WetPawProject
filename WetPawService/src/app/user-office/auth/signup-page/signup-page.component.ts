import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomValidator} from '../../shared/validators.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  // message: string
  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      passwordRepeat: new FormControl(null, Validators.required),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ]),
    },{ validators: CustomValidator.passwordMatchValidator });
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      username: this.form.value.name
    };
    console.log(user);

    this.auth.signup(user).subscribe( (userData: User) => {
      this.form.reset();
      this.router.navigate(['/user', 'login']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
