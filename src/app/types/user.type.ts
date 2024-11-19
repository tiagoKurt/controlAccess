export interface IUser{
  id: number;
  nome: string;
  email: string;
  password: string;
  ativo: boolean;
  cargo: string;
}


export type loginUser = {
  email: string;
  password: string;
}
