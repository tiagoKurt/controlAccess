import { Component } from '@angular/core';
import {FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { NgStyle } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, RouterModule, FloatLabelModule, FormsModule, ButtonModule, NgStyle, InputTextModule,  PasswordModule, RouterModule, AvatarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

}
