import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userId: string | null = null;

  constructor(private _userStateService: UserService) {}

  ngOnInit(): void {
    this.userId = this._userStateService.getUserId();
    console.log('User ID:', this.userId);
  }
}
