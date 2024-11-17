import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'http://localhost:3000/usuarios'

  constructor(private _http : HttpClient) { }

  disableOrEnableUser(usuario: IUser): Observable<IUser>{
    return this._http.put<IUser>(this.apiUrl, usuario);
  }

}
