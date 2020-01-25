import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LostPageComponent} from './pages/lost-page/lost-page.component';
import {FoundPageComponent} from './pages/found-page/found-page.component';
import {SearchHomePageComponent} from './pages/search-home-page/search-home-page.component';
import {PostPageComponent} from './post-page/post-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'lost', component: LostPageComponent},
      {path: 'found', component: FoundPageComponent},
      {path: 'search_home', component: SearchHomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]
  },
  {
    path: 'user', loadChildren: './user-office/user-office.module#UserOfficeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
