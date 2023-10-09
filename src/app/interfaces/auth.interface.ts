export interface LoginAuth {
  ok: boolean;
  usuario: Usuario;
  token: string;
}
export interface RegisterAuth {
  ok: boolean;
  msg: string;
  usuario: Usuario;
}

export interface Usuario {
  id: string;
  fullname: string;
  email: string;
  isactive: boolean;
  role: string;
  created: Date;
  updated: Date;
}

export interface ValidTokenAuth {
  ok: boolean;
  msg: string;
  token: string;
}
