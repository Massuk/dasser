import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UserService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      login: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      status: new FormControl('', Validators.required)
    });
  }

  create(): void {
    console.log('Form values:', this.form.value);
    this.user.idUser = this.form.value['id'];
    this.user.name = this.form.value['name'];
    this.user.lastname = this.form.value['lastname'];
    this.user.login = this.form.value['login'];
    this.user.password = this.form.value['password'];
    this.user.status = this.form.value['status'];

    if (this.form.valid) {
      this.uS.create(this.user).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['dashboard/users']);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
