import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/usuarios'

  constructor(private _http : HttpClient) { }

  getUsers(): Observable<IUser>{
    return this._http.get<IUser>(this.apiUrl);
  }

  storeUser(usuario: IUser): Observable<IUser>{
    return this._http.post<IUser>(this.apiUrl, usuario);
  }


}
