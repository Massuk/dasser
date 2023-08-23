import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();
  idUser: number = 0;
  hidePassword = true;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.uS.getUserData().subscribe((userData: any) => {
      this.idUser = this.data.idUser;
      this.loadUserData();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      status: new FormControl('', Validators.required),
    });
  }

  loadUserData() {
    this.uS.get(this.idUser).subscribe((user) => {
      this.user = user;
      this.patchFormValues();
    });
  }

  patchFormValues() {
    this.form.patchValue({
      name: this.user.name,
      lastname: this.user.lastname,
      login: this.user.login,
      status: this.user.status,
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateUser() {
    if (this.form.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.form.value,
      };

      this.uS.update(updatedUser).subscribe(() => {
        this.closeDialog();
        this.router.navigate(['/dashboard/users']);
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
