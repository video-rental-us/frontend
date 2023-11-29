import { Routes } from '@angular/router';
import { FilmsComponent } from './pages/films/films.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { UsersComponent } from './pages/users/users.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {path: 'films', component: FilmsComponent},
  {path: 'rentals', component: RentalsComponent},
  {path: 'users', component: UsersComponent},
  {path: '', component: MainPageComponent},
  {path: 'register', component: RegisterComponent}
];
