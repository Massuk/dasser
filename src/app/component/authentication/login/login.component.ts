import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  loginForm: FormGroup;
  login: FormControl;
  password: FormControl;

  constructor(
    private lS: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.login = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6),]);
    this.loginForm = this.formBuilder.group({
      login: this.login,
      password: ['', [Validators.required]],
    });
  }

  @ViewChild('inputElement', { static: false }) inputElement:
    | ElementRef
    | undefined;

  onPasswordIconClick(event: Event) {
    event.preventDefault();
  }

  onPasswordIconMouseDown() {
    if (this.inputElement) {
      this.inputElement.nativeElement.type = 'text';
    }
  }

  onPasswordIconMouseUp() {
    if (this.inputElement) {
      this.inputElement.nativeElement.type = 'password';
    }
  }

  signIn() {
    console.log(this.login.value);
    let request = new JwtRequest();
    request.username = this.login.value;
    request.password = this.password.value;
    this.lS.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        sessionStorage.setItem('username', request.username);
        this.router.navigate(['/dashboard/users']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
