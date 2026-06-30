# Cadastro e Lista de Recados

Sistema full-stack de gerenciamento de recados pessoais.

## Tecnologias

- Frontend: React
- Backend: Laravel 11 + Sanctum
- Banco: MySQL 8

## Pré-requisitos

- Node.js v20+
- PHP 8.2+
- Composer 2
- MySQL 8 rodando

## Como rodar o backend

```bash
cd backend
composer install
cp .env.example .env
```

Edite `.env` com suas credenciais.

Depois:
```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

## Como rodar o frontend

```bash
cd frontend
npm install
npm start
```

## Funcionalidades

- ✅ Autenticação (login/cadastro)
- ✅ Listar recados
- ✅ Adicionar recado
- ✅ Deletar recado
- ✅ Logout

Backend rodará em `http://localhost:8000`
Frontend rodará em `http://localhost:3000`
