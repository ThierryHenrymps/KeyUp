export type Category = "senhas" | "arquivos" | "notas";
export type Filter = "todos" | Category | "favoritos";
export type Tone = "blue" | "purple";

export interface VaultItem {
  id: number;
  title: string;
  category: Category;
  favorite: boolean;
  subtitle: string; // usuário, tamanho do arquivo ou "Nota segura"
  password?: string;
  secret?: string; // conteúdo de notas seguras
  site?: string;
  folder?: string;
  strength: number; // 0-100
  updatedAt: string;
  tone: Tone;
  note?: string;
}
