import React from "react";

export interface dataType {
  Email: string;
  Tel: number;
  Username: string;
  Balance: number;
  Account?: { Main: account; Aux: account };
}

export interface account {
  type: string;
  name: String;
  number: number;
}

export type HomeType = {
  login: boolean;
  setlogin: (b: boolean) => void;
};

export type navtype = {
  open: boolean;
  setOpen: (b: boolean) => void;
  switchNav: (e: React.MouseEvent<HTMLElement>) => void;
};

export type Apptype = {
  showPreloader: () => void;
};
