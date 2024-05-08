export interface CreateContact {
  name: string;
  email: string;
  description: string;
  phone: string;
}

export interface MessageContact {
  ok: boolean;
  msg: string;
}

export interface ContactList {
  ok: boolean;
  data: Contact[];
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  description: string;
  email: string;
  date_created: string;
  is_active: boolean;
}
