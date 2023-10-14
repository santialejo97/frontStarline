export interface GetListService {
  ok: boolean;
  data: service[];
}
export interface GetService {
  ok: boolean;
  servicio: service;
}

export interface service {
  id: string;
  nameservice: string;
  descripcion: string;
  precio: string;
  isactive: boolean;
  created_service: Date;
  updated_service: Date;
}
