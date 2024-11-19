import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ToastModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    RouterModule,
    FloatLabelModule,
    ButtonModule,
    NgStyle,
    InputTextModule,
    PasswordModule,
    RouterModule,
    AvatarModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
    cargos : {label: string, value: string}[]


  constructor(private fb: FormBuilder,
              private _userService: UserService,
              private messageService: MessageService) {
    this.cargos = [
      { label: 'Usuário', value: 'ROLE_USUARIO' },
      { label: 'Gerente', value: 'ROLE_GERENTE' },
      { label: 'Administrador', value: 'ROLE_ADMIN' }
    ]
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      ativo: true,
      cargo: ['',Validators.required]
    });
  }

  ngOnInit(): void {

  }

  storeUser() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      console.log(userData)
      this._userService.storeUser(userData).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso:', response);
          this.userForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Usuario cadastrado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Preencha todos os campos!' });
        }
      });
    }
  }
}
