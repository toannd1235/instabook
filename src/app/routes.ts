import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HeaderComponent } from '../app/header/header.component';
import {TeamComponent} from  '../app/team/team.component';
import { FooterComponent } from '../app/footer/footer.component';
import {ProfilesComponent} from '../app/profiles/profiles.component';
import {HomeComponent} from "./home/home.component";
import { PostdetailComponent } from './postdetail/postdetail.component';
import { SearchComponent } from './search/search.component'
import { CommonModule } from '@angular/common';
// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path : 'profile/:idFb',
    component : ProfilesComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },
  {
    path : 'login/download',
    component : LoginComponent,

  },
  {
    path: 'search/:keyword',
    component: SearchComponent,
  },
  {
    path: ':id',
    component: PostdetailComponent,
  },


  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
