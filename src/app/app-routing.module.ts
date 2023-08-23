import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { RegisterComponent } from './component/authentication/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/entities/user/user.component';
import { UserListComponent } from './component/entities/user/user-list/user-list.component';
import { UserCreateComponent } from './component/entities/user/user-create/user-create.component';
import { UserUpdateComponent } from './component/entities/user/user-update/user-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UserComponent,
        children: [
          {
            path: 'list',
            component: UserListComponent
          },
          {
            path: 'create',
            component: UserCreateComponent
          },
          {
            path: 'update/:id',
            component: UserUpdateComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
