import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../types/user.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  token: string | null = null;
  apiUrl = "localhost:8080/api/usuario/profile"
  user : IUser = {
    id: 0,
    nome: '',
    email: '',
    password: '',
    ativo: false,
    cargo: ''
  }
  constructor(private _userStateService: UserService) {}

  ngOnInit(): void {
    this.token = this._userStateService.getToken();
    if (this.token) {
      this._userStateService.getUserByToken().subscribe(data => {
        this.user = data;
      });
    }
  }
}
