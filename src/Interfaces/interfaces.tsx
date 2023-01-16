import React from "react";

export interface dataType {
  Email: string;
  Tel: number;
  Username: string;
  Balance: number;
  Bank?: account[];
  Type?: string;
}

export interface account {
  type: string;
  name: String;
  number: number;
}

export interface history {
  type: string;
  name: String;
  card: string;
  id: string;
  status: string;
  date: string;
  amount?: number;
  mail?: string;
  bank?: account;
}

export type HomeType = {
  login: boolean;
  setlogin: (b: boolean) => void;
};

export type navtype = {
  open: boolean;
  setOpen: (b: boolean) => void;
  fetchdata: () => void;
};

export type Apptype = {
  showPreloader: () => void;
};
