import { Component, OnInit } from '@angular/core';
import {FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ToastModule, DropdownModule, FormsModule, CommonModule, RouterModule, FloatLabelModule, FormsModule, ButtonModule, NgStyle, InputTextModule,  PasswordModule, RouterModule, AvatarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit{
  email: string | undefined;
  nome: string | undefined;
  password: string | undefined;

  ngOnInit(): void {

  }
}
