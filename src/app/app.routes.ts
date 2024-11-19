import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { userGuard } from './guards/auth/user.guard';
import { adminGuard } from './guards/admin/admin.guard';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [userGuard] },
  { path: 'usersList', component: UserListComponent,
    canActivate: [adminGuard]
  }
];
