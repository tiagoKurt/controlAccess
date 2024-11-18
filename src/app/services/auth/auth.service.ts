import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../types/user.type';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private authSubject = new BehaviorSubject<any>(null); // Use um BehaviorSubject
  user$ = this.authSubject.asObservable(); // Observable público para o usuário

  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
    private _userStateService: UserService
  ) {}

  async login(email: string, password: string): Promise<boolean> {
      const users = await this.http
        .get<any[]>(this.apiUrl)
        .toPromise();

      if (users) {
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          this.setAuthState(user);
          this._userStateService.setUserId(user.id);

          this.router.navigate(['/profile']);
          return true;
        }
      }

    return false;
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
