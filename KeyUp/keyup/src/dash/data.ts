import type { VaultItem } from "./types";

// Dados de exemplo. Troque pela sua API / camada de dados criptografada.
export const initialItems: VaultItem[] = [
  { id: 1, title: "Apple ID", category: "senhas", favorite: true, subtitle: "vick@keyup.app", password: "Norte-2026!aQ", site: "appleid.apple.com", strength: 92, updatedAt: "há 2 dias", tone: "blue", note: "Verificação em duas etapas ativada." },
  { id: 2, title: "Banco Aurora", category: "senhas", favorite: true, subtitle: "vick.pimenta", password: "Aurora#7219!!", site: "bancoaurora.com.br", strength: 78, updatedAt: "há 3 semanas", tone: "purple", note: "Token no aplicativo do banco." },
  { id: 3, title: "Streaming", category: "senhas", favorite: false, subtitle: "vick@keyup.app", password: "filmes123", site: "streaming.com", strength: 34, updatedAt: "há 8 meses", tone: "blue" },
  { id: 4, title: "Trabalho", category: "senhas", favorite: false, subtitle: "vpimenta", password: "Trabalho#Cofre.99", site: "intranet.empresa.com", strength: 88, updatedAt: "há 1 mês", tone: "purple", note: "Troca obrigatória a cada 90 dias." },
  { id: 5, title: "Passaporte.pdf", category: "arquivos", favorite: false, subtitle: "2,4 MB", folder: "Documentos pessoais", strength: 100, updatedAt: "há 2 meses", tone: "purple", note: "Cópia digitalizada, frente e verso." },
  { id: 6, title: "Contrato de aluguel.pdf", category: "arquivos", favorite: true, subtitle: "1,1 MB", folder: "Moradia", strength: 100, updatedAt: "há 5 meses", tone: "blue", note: "Vence em março." },
  { id: 7, title: "Frase de recuperação", category: "notas", favorite: true, subtitle: "Nota segura", secret: "colina · nuvem · prata · relógio · jardim · ponte", strength: 100, updatedAt: "há 1 ano", tone: "purple", note: "Guardada com criptografia de ponta a ponta." },
  { id: 8, title: "Wi-Fi de casa", category: "notas", favorite: false, subtitle: "Nota segura", secret: "sol-e-mar-2026", strength: 100, updatedAt: "há 4 meses", tone: "blue", note: "Rede: Casa-5G" },
];
