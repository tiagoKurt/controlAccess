import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
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
      const user = {
        email : this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this._authService.login(user).then(token =>{

        if(!token){
          this.messageService.add({severity: 'error', summary: 'Erro!', detail: 'Email ou senha incorretos!',
          });
        }else{
          this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Login efetuado com sucesso!'});
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Preencha todos os campos!' });
    }
  }

}
