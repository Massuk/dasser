import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  innerWidth: any;
  idUser: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'lastname',
    'user',
    'creationdate',
    'modifieddate',
    'status',
    'actions'
  ];

  constructor(private uS: UserService, private dialog: MatDialog){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.uS.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
    });

    this.uS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }
  
  clearFilter() {
    this.dataSource.filter = '';
  }

  showCreateUserPopup(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      height: 'auto',
      width: '555px',
      data: {},
    });
  }

  showUpdateUserPopup(idUser: number): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      height: 'auto',
      width: '555px',
      data: { idUser: idUser },
    });
  }
  
  toggleBadgeStatus(idUser: number, currentStatus: string) {
    let newStatus: string;

    if (currentStatus === 'ACTIVO') {
      newStatus = 'BLOQUEADO';
    } else if (currentStatus === 'BLOQUEADO') {
      newStatus = 'ELIMINADO';
    } else {
      newStatus = 'ACTIVO';
    }

    this.uS.get(idUser).subscribe(user => {
      user.status = newStatus;
      this.uS.update(user).subscribe(() => {
      });
    });
  }
}
