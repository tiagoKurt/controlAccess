import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../types/user.type';
import { LocalStorageService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string | null = null;
  apiUrl = 'http://localhost:8080/api/usuario/'

  constructor(private _http : HttpClient,
              private _tokenService: LocalStorageService
  ) { }


  setToken(token: string): void {
    this.token = token;
  }

  getUserByToken(): Observable<IUser> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this._http.get<IUser>('http://localhost:8080/api/usuario/profile', { headers });
  }

  getToken(): string | null {
    return this._tokenService.getItem("token");
  }

  getUsers(): Observable<IUser[]>{
    return this._http.get<IUser[]>(this.apiUrl  + "lista");
  }

  storeUser(usuario: IUser): Observable<IUser>{
    return this._http.post<IUser>(this.apiUrl, usuario);
  }


}
