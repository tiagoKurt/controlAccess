import { Component, OnInit } from '@angular/core';
import { IUser } from '../../types/user.type';
import { UserService } from '../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  activeOptions = [
    { label: 'Ativado', value: true },
    { label: 'Desativado', value: false }
  ];

  roleOptions = [
    { label: 'Usuário', value: 'user' },
    { label: 'Gerente', value: 'gerente' },
    { label: 'Administrador', value: 'adm' }
  ];

  usersList: IUser[] = [];

  constructor(private _userService: UserService,
              private messageService: MessageService,
              private _adminService: AdminService
  ){}

  ngOnInit(): void {
      this._userService.getUsers().subscribe(data =>{
        this.usersList = data;
      })
  }

  getRoleLabel(role: string): string {
    const roleOption = this.roleOptions.find(option => option.value === role);
    return roleOption ? roleOption.label : role;
  }

  onRowEditInit(user: any) {
    console.log('Editando linha:', user);
  }

  onRowEditSave(user: IUser, userId: number) {
      this._adminService.disableOrEnableUser(user, userId).subscribe(
        updatedUser => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Status do usuário atualizado com sucesso.'
          });
        },
        error => {
          console.error('Erro ao atualizar usuário:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Erro ao atualizar o status do usuário.'
          });
        }
      );
  }

  onRowEditCancel(user: any, index: number) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Edição cancelada com sucesso!' });
  }
}
