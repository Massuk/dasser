// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardActions, MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';


// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EntitiesComponent } from './component/entities/entities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/authentication/login/login.component';
import { RegisterComponent } from './component/authentication/register/register.component';
import { BodyComponent } from './component/dashboard/body/body.component';
import { HeaderComponent } from './component/dashboard/header/header.component';
import { SidenavComponent } from './component/dashboard/sidenav/sidenav.component';
import { UserComponent } from './component/entities/user/user.component';
import { UserListComponent } from './component/entities/user/user-list/user-list.component';
import { UserCreateComponent } from './component/entities/user/user-create/user-create.component';
import { UserUpdateComponent } from './component/entities/user/user-update/user-update.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    EntitiesComponent,
    LoginComponent,
    RegisterComponent,
    BodyComponent,
    HeaderComponent,
    SidenavComponent,
    UserComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    CommonModule,
    HttpClientModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
