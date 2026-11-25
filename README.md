# KeyUp

**Your keys. Your security.**

O KeyUp é um projeto de gerenciador de senhas e cofre digital desenvolvido com o objetivo de oferecer um espaço centralizado para armazenar e organizar informações pessoais de forma segura.

A proposta é reunir senhas, documentos, arquivos e notas privadas em uma única plataforma, com foco em privacidade, facilidade de uso e segurança desde a arquitetura inicial.

Atualmente, o projeto está em desenvolvimento e sua primeira etapa, a landing page, já foi concluída.

---

## Visão do projeto

O KeyUp nasceu da ideia de resolver um problema comum: a dificuldade de gerenciar diversas senhas, credenciais e informações importantes espalhadas por diferentes lugares.

Mais do que um gerenciador de senhas, a proposta é desenvolver um cofre digital que permita ao usuário ter controle sobre suas informações e sobre o destino delas.

<img width="1887" height="896" alt="image" src="https://github.com/user-attachments/assets/29fd7d07-ca70-4c58-b72d-b3584451364d" />



## Funcionalidades planejadas

### Gerenciador de senhas
- Armazenamento organizado de credenciais.
- Cadastro e gerenciamento de contas.
- Geração de senhas fortes.
- Organização por categorias.
- Busca rápida de informações.

### Cofre de arquivos
- Armazenamento de documentos pessoais.
- Organização de arquivos.
- Acesso protegido às informações.

### Notas seguras
- Criação de anotações privadas.
- Armazenamento de informações sensíveis.
- Organização de notas dentro do cofre.

### Gerador de senhas
- Geração de senhas aleatórias.
- Configuração de tamanho e caracteres.
- Criação de combinações mais resistentes a ataques de força bruta.

### Legado Digital
Um dos diferenciais planejados do KeyUp é o recurso de Legado Digital.

A ideia é permitir que o usuário configure contatos de confiança e determine procedimentos para disponibilizar determinadas informações em situações excepcionais, como seu falecimento.

O recurso deverá possuir mecanismos de confirmação, períodos de contestação e autorização prévia do proprietário, evitando que a simples ausência de atividade seja interpretada automaticamente como falecimento.

---

## Segurança e privacidade

A segurança é um dos principais pilares do KeyUp.

A arquitetura está sendo planejada para utilizar criptografia no próprio dispositivo do usuário, reduzindo a exposição de informações sensíveis ao servidor.

Princípios previstos:

- Arquitetura Zero-Knowledge.
- Criptografia de ponta a ponta.
- Derivação segura de chaves.
- Proteção contra acessos não autorizados.
- Gerenciamento de sessões.
- Autenticação segura.
- Proteção contra ataques comuns em aplicações web.

**Importante:** essas características representam os objetivos arquiteturais do projeto. Elas ainda precisam ser implementadas, testadas e validadas antes de serem consideradas garantias de segurança.

---

## Tecnologias

### Frontend
- React
- TypeScript
- CSS
- Framer Motion
- Vite

### Backend (planejado)
- Java
- Spring Boot
- Spring Security
- Spring Data JPA

### Banco de dados (planejado)
- PostgreSQL

### Infraestrutura (planejada)
- Docker
- Docker Compose
- Deploy em nuvem

---

## Identidade visual

O KeyUp utiliza uma identidade visual inspirada na simplicidade e experiência de uso dos produtos Apple.

Principais características:

- Interface minimalista.
- Tema escuro.
- Gradientes em azul e roxo.
- Elementos visuais sutis.
- Animações suaves.
- Layout responsivo.

O objetivo é oferecer uma experiência moderna, intuitiva e consistente em diferentes dispositivos.

---

## Status do desenvolvimento

| Etapa | Status |
|---|---|
| Identidade visual | Concluída |
| Landing page | Concluída |
| Responsividade | Implementada na landing page |
| Dashboard | Planejado |
| Autenticação | Planejado |
| Gerenciador de senhas | Planejado |
| Cofre de arquivos | Planejado |
| Notas seguras | Planejado |
| Criptografia | Em planejamento |
| Legado Digital | Planejado |
| Backend | Planejado |
| Banco de dados | Planejado |
| Deploy | Planejado |

---

## Executando o projeto

### Pré-requisitos

- Node.js
- npm
- Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/KeyUp.git
```

Entre na pasta:

```bash
cd KeyUp
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará um endereço local no terminal, normalmente:

```text
http://localhost:5173
```

---

## Objetivos do projeto

O KeyUp também é um projeto de aprendizado e aplicação prática de conceitos utilizados no desenvolvimento de software.

Entre os principais objetivos estão:

- Desenvolver uma aplicação Full Stack.
- Aplicar boas práticas de arquitetura.
- Trabalhar com APIs REST.
- Implementar autenticação e autorização.
- Desenvolver uma arquitetura de criptografia segura.
- Utilizar containers com Docker.
- Aplicar testes automatizados.
- Trabalhar com versionamento utilizando Git.
- Realizar deploy de uma aplicação em ambiente de produção.

---

## Aviso de segurança

O KeyUp está em desenvolvimento e ainda não deve ser utilizado para armazenar senhas reais, credenciais ou documentos sensíveis.

A implementação e validação de todos os mecanismos de segurança são etapas fundamentais antes de qualquer utilização com dados reais.

---

**KeyUp — Your keys. Your security.**
