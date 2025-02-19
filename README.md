# 📘 Documentação do Projeto

## 📌 Visão Geral

Este projeto foi desenvolvido utilizando a arquitetura  **Monorepo** , permitindo gerenciar múltiplos pacotes em um único repositório, otimizando a manutenção, integração e escalabilidade.

O projeto é composto por  **três aplicações** :

* **Page** (Frontend) → Interface de testes e interação com o plugin.
* **Plugin** → Script responsável pela extração de dados.
* **API** → Responsável por armazenar e listar os dados extraídos no Firebase.

## 🏗 Estrutura do Repositório

O projeto foi organizado seguindo a estrutura abaixo:

```
Root/
├── apps/
│   ├── frontend/  # Interface do usuário
│   ├── plugin/    # Plugin de extração de dados
│   ├── api/       # API para armazenar e listar dados
│
├── package.json   # Configuração do monorepo
├── lerna.json     # Configuração do Lerna
├── tsconfig.json  # Configuração do TypeScript
└── README.md      # Documentação do projeto
```

---

## 📌 Padrões de Projeto Utilizados e Motivação

### **1️⃣ Arquitetura Hexagonal (Ports & Adapters)**

A arquitetura hexagonal foi aplicada em todos os módulos (Frontend, Plugin e API) para garantir separação de responsabilidades e maior manutenção do sistema. Ela permite que a lógica de negócio seja independente de interfaces externas (como APIs, UI e banco de dados).

### **2️⃣ Monorepo (Lerna + Workspaces)**

O uso do **Lerna** e **Workspaces** do npm facilita o gerenciamento dos módulos, permitindo a execução paralela e compartilhamento de dependências entre os projetos.

### **3️⃣ Design Patterns Aplicados**

* **Adapter Pattern** → Aplicado para abstrair chamadas externas (APIs, Firebase, LocalStorage).
* **Service Layer** → Separa a lógica de negócio da interface.
* **Factory Pattern** → Utilizado para a criação do botão do plugin dinamicamente.

---

## 📊 Diagrama da Arquitetura Utilizada

```plaintext
  +---------------------------+
|       Frontend (Page)     |
|  [React + TS]             |
|  Consome API + Injeta o   |
|  Plugin                   |
+---------------------------+
         |  
         v  
+---------------------------+
|       Plugin JS           |
|  Extração de Dados        |
|  Envio para API           |
+---------------------------+
         |  
         v  
+---------------------------+
|       API (Express)       |
|  Firebase Realtime DB     |
|  Autenticação + RateLim   |
+---------------------------+
```

## 📩 Entrega e Compartilhamento

* **Subir o projeto para o GitHub** e compartilhar o link com:
  * [matheusmoura@handtalk.me](mailto:matheusmoura@handtalk.me)
  * [carlos@handtalk.me](mailto:carlos@handtalk.me)
* **Adicionar os e-mails acima como "Editor" no Firebase** .
* **Gerar um PDF desta documentação** e enviar para os e-mails mencionados.

---

## 🚀 Como Rodar o Projeto?

### **1️⃣ Instalar dependências**

```sh
yarn install
```

### **2️⃣ Iniciar os projetos**

```sh
yarn dev
```

### **3️⃣ Rodar os projetos em modo de desenvolvimento**

```sh
yarn test
```

---

## 📌 Considerações Finais

* O projeto foi desenvolvido para ser executado  **localmente** .
* Todos os serviços devem estar rodando para a funcionalidade completa (API + Plugin + Frontend).
* O **Firebase** está configurado como base de dados e requer permissão para acesso.

**🔹 Dúvidas? Entre em contato!**
