export const initialSites: any[] = [];
export const initialPersonal: any[] = [];

import type { IconName } from "../components/ui/Icon";

export const personalCategories = ["Senhas pessoais", "Documentos", "Notas"];

export type Site = {
  id: string;
  name: string;
  url: string;
  user: string;
  lastAccess: string;
  icon?: IconName;
};

export type PersonalItem = {
  id: string;
  name: string;
  category: string;
  detail: string;
};

export type NewItem = {
  kind: "site" | "personal";
  name: string;
  url?: string;
  user?: string;
  category?: string;
};

export type Selection = {
  kind: "home" | "site" | "personal";
  id?: string;
};