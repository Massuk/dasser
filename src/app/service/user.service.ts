import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const urlData = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${urlData}/users`;
  private changeList = new Subject<User[]>();

  constructor(private http: HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<User[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  create(user: User) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, user, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getList() {
    return this.changeList.asObservable();
  }

  setList(newList: User[]) {
    this.changeList.next(newList);
  }

  get(idUser: number): Observable<User> {
    let token = sessionStorage.getItem('token');
    return this.http.get<User>(`${this.url}/${idUser}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(user: User) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, user, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }).pipe(
      tap(() => {
        this.list().subscribe((data) => this.setList(data));
      })
    );
  }

  getUserData(): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.get(`${this.url}/info`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
