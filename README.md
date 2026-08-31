# Plataforma de Onboarding Corporativo — Implementação Tradicional

Este repositório contém a implementação tradicional de uma **Plataforma Web de Onboarding Corporativo**, desenvolvida como parte do meu Trabalho de Conclusão de Curso (TCC).

O projeto tem como objetivo apoiar o processo de integração de novos colaboradores em uma empresa, permitindo a disponibilização de conteúdos de onboarding, acompanhamento de progresso e administração de usuários e conteúdos.

Além da construção da aplicação, o projeto faz parte de um estudo comparativo entre uma abordagem de desenvolvimento tradicional e uma abordagem utilizando **Claude Code como agente de desenvolvimento baseado em IA**.

---

## Sobre o projeto

A plataforma possui dois tipos de usuários:

### Administrador

O administrador pode:

- Fazer login na plataforma;
- Criar novos administradores e colaboradores;
- Gerenciar conteúdos de onboarding;
- Organizar conteúdos por categorias;
- Visualizar os usuários cadastrados;
- Acompanhar o progresso dos colaboradores.

### Colaborador

O colaborador pode:

- Fazer login na plataforma;
- Visualizar os conteúdos de onboarding;
- Acessar os detalhes de um conteúdo;
- Marcar conteúdos como concluídos;
- Acompanhar seu próprio progresso.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt

---

## Autenticação e autorização

A autenticação da aplicação utiliza **JWT (JSON Web Token)**.

Após realizar o login, o backend gera um token contendo a identificação e o perfil do usuário.

Existem dois perfis:

```text
admin
employee
```

As rotas protegidas utilizam middlewares para validar o token e verificar se o usuário possui permissão para acessar determinado recurso.

Por exemplo, apenas usuários com perfil `admin` podem cadastrar novos usuários.

---

## Banco de dados

O banco de dados utiliza PostgreSQL e é acessado através do Prisma ORM.

As principais entidades são:

- `User`
- `Category`
- `Content`
- `Progress`
- `Attachment`

O projeto também possui migrations e seed para criação dos dados iniciais de desenvolvimento.

---

## Estrutura do projeto

```text
projeto_final_trad/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── middleware/
│       ├── routes/
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

## Como executar o projeto

### Pré-requisitos

É necessário ter instalado:

- Node.js
- npm
- PostgreSQL

### 1. Clone o repositório

```bash
git clone <URL-DO-REPOSITORIO>
cd projeto_final_trad
```

### 2. Configure o backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
DATABASE_URL="postgresql://USUARIO@localhost:5432/onboarding_db"
JWT_SECRET="sua-chave-secreta"
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Execute o seed:

```bash
npx prisma db seed
```

Inicie o backend:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

### 3. Configure o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível normalmente em:

```text
http://localhost:5173
```

---

## Usuários de teste

O seed cria usuários para testes locais.

### Administrador

```text
Email: admin@example.com
Senha: admin123
```

### Colaborador

```text
Email: employee@example.com
Senha: employee123
```

> As credenciais acima são destinadas exclusivamente ao ambiente local de desenvolvimento.

---

## Funcionalidades

### Autenticação

- [x] Cadastro e login no backend
- [x] Hash de senhas com bcrypt
- [x] Autenticação utilizando JWT
- [x] Controle de acesso por perfil
- [x] Middleware de proteção das rotas
- [x] Tela de login
- [x] Proteção de rotas no frontend
- [x] Cadastro de usuários pelo administrador

### Conteúdos

- [ ] CRUD de conteúdos
- [ ] Categorização de conteúdos
- [ ] Painel administrativo
- [ ] Listagem de conteúdos para colaboradores
- [ ] Visualização dos detalhes de um conteúdo

### Progresso

- [ ] Marcar conteúdo como concluído
- [ ] Visualizar progresso individual
- [ ] Dashboard de acompanhamento

---

## 📊 Contexto acadêmico

Este projeto faz parte de um estudo experimental que busca comparar diferentes abordagens de desenvolvimento de software.

Uma mesma aplicação é implementada em duas abordagens:

1. **Implementação tradicional** — este repositório;
2. **Implementação utilizando Claude Code**.

Durante o desenvolvimento são coletadas métricas como:

- Tempo de implementação;
- Erros encontrados;
- Retrabalho;
- Número de revisões;
- Qualidade do código;
- Observações sobre o processo de desenvolvimento.

Ao final, os resultados das duas abordagens serão comparados para analisar os impactos do uso de agentes de inteligência artificial no desenvolvimento de software.

---

## Design

As interfaces da aplicação foram planejadas previamente no Figma, mantendo o mesmo design como referência para as duas implementações do experimento.

A interface utiliza uma identidade visual corporativa, com foco em simplicidade, clareza e facilidade de utilização.

---

## Autora

**Thais Einsfeld da Rocha**

Projeto desenvolvido como parte do Trabalho de Conclusão de Curso (TCC).
