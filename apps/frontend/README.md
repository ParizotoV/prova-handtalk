# 📖 Documentação do Padrão de Projeto

## 📌 Arquitetura Utilizada: Hexagonal (Ports & Adapters)

A arquitetura hexagonal, também conhecida como **Ports and Adapters**, foi aplicada para desacoplar a lógica de negócio das interfaces externas (como UI, API e armazenamento de estado). Isso melhora a testabilidade, flexibilidade e manutenibilidade do código.

---

## 🏗 Estrutura do Projeto

O frontend foi estruturado seguindo o padrão de camadas da arquitetura hexagonal:

```
📂 src/
├── 📂 adapters/ (Interface de Entrada e Saída)
│   ├── 📂 inbound/ (Componentes que interagem com o usuário)
│   │   ├── pages/ (Páginas principais)
│   │   │   ├── Home.tsx
│   │   ├── components/ (Componentes reutilizáveis)
│   │   │   ├── Avatar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── NavBar.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   ├── App.tsx (Ponto de entrada do React)
│   │
│   ├── 📂 outbound/ (Comunicação com APIs externas e banco de dados)
│
├── 📂 application/ (Regras de Negócio)
│   ├── themeService.ts (Gerenciamento de temas)
│
├── 📂 infrastructure/ (Infraestrutura)
│   ├── themeRepository.ts (Persistência e repositório de temas)
│
├── 📂 styles/ (Estilização e design system)
│   ├── avatar.css
│   ├── footer.css
│   ├── home.css
│   ├── navbar.css
│   ├── theme-toggle.css
│   ├── theme.css
│
├── index.tsx (Ponto de inicialização do React)
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
```

---

## 🎯 Explicação das Camadas

### 1️⃣ **Adapters (Portas de Entrada e Saída)**

- **Inbound:** Contém componentes React, páginas e interações do usuário.
- **Outbound:** Gerencia integrações externas.

### 2️⃣ **Application (Regras de Negócio)**

- Centraliza a lógica do tema, acessibilidade e processamento de dados.
- Não depende de React ou APIs – pode ser testado isoladamente.

### 3️⃣ **Infrastructure (Infraestrutura e Configurações)**

- Define persistência, repositórios e configurações globais.

---

## 📝 Como a Arquitetura Hexagonal foi aplicada no Frontend?

A separação de **Adapters, Application e Infrastructure** garante que o frontend siga o princípio **"Separation of Concerns"**:

✅ **Componentes React (adapters/inbound)**: Somente renderizam e capturam eventos.
✅ **Lógica de negócio (application)**: Isolada, permitindo testes unitários mais fáceis.
✅ **Integração externa (adapters/outbound)**: Se a API mudar, não afeta a lógica principal.

Isso permite substituir APIs, plugins ou bibliotecas sem alterar a lógica principal do sistema.

---

## 🛠 Diagrama da Arquitetura

```
+----------------------------------+
|         UI / React               |
|  (adapters/inbound: componentes) |
+----------------------------------+
               |
               v
+----------------------------------+
|  Application (Regras de Negócio)  |
|          (themeService)           |
+----------------------------------+
               |
+--------------------------------------+
|      Infrastructure (Persistência)   |
|            (themeRepository)         |
+--------------------------------------+
               |
+-------------------------------+
|        Outbound Adapters      |
|                               |
+-------------------------------+
```

---

## 📌 Benefícios da Arquitetura Hexagonal

✅ **Facilidade de Testes:** A lógica de negócio não depende do React, permitindo testes unitários isolados.
✅ **Flexibilidade:** Podemos mudar o backend ou o plugin sem afetar a lógica central.
✅ **Manutenção Simplificada:** O código está modularizado e fácil de entender.

---

## 🚀 Como Rodar o Projeto?

### **1️⃣ Instalar dependências**

```sh
yarn install
```

### **2️⃣ Rodar o servidor de desenvolvimento**

```sh
yarn dev
```

### **3️⃣ Rodar os testes unitários**

```sh
yarn test
```

---

## 📜 Considerações Finais

A implementação da **arquitetura hexagonal** no frontend garante um projeto organizado, escalável e de fácil manutenção. Esse modelo permite que o sistema evolua sem comprometer a estabilidade do código existente.
