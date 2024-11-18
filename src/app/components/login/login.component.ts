import { Component, OnInit } from '@angular/core';
import {FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, RouterModule, FloatLabelModule, FormsModule, ButtonModule, NgStyle, InputTextModule,  PasswordModule, RouterModule, AvatarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private messageService: MessageService
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  userLogin(){
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(loginSucesso =>{
        if(!loginSucesso){
          this.messageService.add({severity: 'error', summary: 'Erro!', detail: 'Email ou senha incorretos!',
          });
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Preencha todos os campos!' });
    }
  }

}
