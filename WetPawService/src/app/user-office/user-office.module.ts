import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import {AuthService} from './shared/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AuthGuardService} from './shared/auth-guard.service';
import { AlertComponent } from './shared/alert/alert.component';
import {AlertService} from './shared/alert.service';
@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    SignupPageComponent,
    CreatePageComponent,
    ProfilePageComponent,
    EditPageComponent,
    PostsPageComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [
          {path: '', redirectTo: '/user/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'signup', component: SignupPageComponent},
          {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardService]},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuardService]},
          {path: 'post/edit/:id', component: EditPageComponent, canActivate: [AuthGuardService]},
          {path: 'posts', component: PostsPageComponent, canActivate: [AuthGuardService]}
        ]
      }
    ]),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [AuthService, AuthGuardService, AlertService],
  exports: [RouterModule],
})
export class UserOfficeModule {

}
