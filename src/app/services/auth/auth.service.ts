import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../../types/auth.type';
import { loginUser } from '../../types/user.type';
import { LocalStorageService } from '../token/token.service';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuario/login';
  private authSubject = new BehaviorSubject<any>(null); // Use um BehaviorSubject
  user$ = this.authSubject.asObservable(); // Observable público para o usuário

  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
    private _userStateService: UserService,
    private _tokenService: LocalStorageService
  ) {}

  
  async login(usuario : loginUser){
      const response = await this.http
        .post<AuthResponse>(this.apiUrl,usuario)
        .toPromise().then((response) => {
          return response;
        });

        if (response) {
          this._tokenService.setItem("token", response.token);
          this._userStateService.setToken(response.token);
          this.setAuthState(response.token);
          return this.router.navigate(['/profile']);
        }
       else{
        return;
       }
      }
  


  logout(): void {
    this.setAuthState(null); // Limpe o estado de autenticação
    this.router.navigate(['/login']);
  }

  private setAuthState(user: any): void {
    this.authSubject.next(user); // Atualize o BehaviorSubject
  }
  get isAutenticado(): boolean {
    // Getter para isAutenticado
    return !!this.authSubject.value; // Retorna true se houver um usuário
  }

  get cargo(): string {
    // Getter para cargo
    return this.authSubject.value ? this.authSubject.value.cargo : ''; // Retorna o cargo ou uma string vazia
  }
}
