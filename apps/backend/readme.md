# 📖 Documentação do Padrão de Projeto - API

## 📌 Arquitetura Utilizada: Hexagonal (Ports & Adapters)

A arquitetura hexagonal (Ports & Adapters) foi adotada para garantir a separação entre a lógica de negócio e as interfaces externas, proporcionando maior manutenibilidade, testabilidade e flexibilidade na API.

---

## 🏗 Estrutura do Projeto

A API foi organizada em camadas seguindo os princípios da arquitetura hexagonal:

```
📂 src/
├── 📂 adapters/ (Interface de Entrada e Saída)
│   ├── 📂 inbound/ (Rotas e controladores)
│   │   ├── collectController.ts
│   │   ├── listController.ts
│   │
│   ├── 📂 outbound/ (Comunicação com o Firebase)
│   │   ├── firebaseRepository.ts
│   │   ├── tokenRepository.ts
│
├── 📂 application/ (Regras de Negócio)
│   ├── 📂 services
│   │      ├── collectService.ts
│   │      ├── listService.ts
│
├── 📂 config/ (Configuração da Aplicação)
│   ├── firebase.ts (Configuração do Firebase)
│   ├── swagger.ts (Configuração do Swagger)
│
├── 📂 middlewares/ (Validações e Segurança)
│   ├── authMiddleware.ts (Autenticação por token)
│   ├── rateLimiterMiddleware.ts (Controle de requisições)
│   ├── asyncHandler.ts (Tratamento de erros assíncronos)
│
├── 📂 types/ (Extensões de Tipos do TypeScript)
│   ├── express.d.ts (Extensão do Request do Express para userDomain)
│
├── 📂 __tests__/ (Testes automatizados)
│   ├── collectService.test.ts
│   ├── listService.test.ts
│
├── package.json
├── tsconfig.json
├── .env
└── server.ts (Ponto de entrada do servidor Express)
```

---

## 🎯 Explicação das Camadas

### **1️⃣ Adapters (Portas de Entrada e Saída)**

* **Inbound** : Contém os controladores responsáveis por receber as requisições HTTP e chamar os serviços apropriados.
* **Outbound** : Responsável por gerenciar integrações com sistemas externos, como Firebase.

### **2️⃣ Application (Regras de Negócio)**

* Contém a lógica de negócio da aplicação, implementada em serviços independentes das interfaces externas.
* É a camada intermediária entre os adaptadores e a infraestrutura.

### **3️⃣ Config (Configurações da Aplicação)**

* Contém arquivos de configuração do Firebase e do Swagger para documentação da API.

### **4️⃣ Middlewares (Intermediários de Segurança e Tratamento de Requisições)**

* Implementa autenticação, controle de taxa de requisições e tratamento de erros assíncronos.

### **5️⃣ Types (Extensões de Tipos para o TypeScript)**

* Define tipagens personalizadas para extensão das funcionalidades do Express.

### **6️⃣ Tests (Testes Automatizados)**

* Contém testes unitários para os serviços de coleta e listagem de dados.

---

## 🛠 Diagrama da Arquitetura

Aqui está um diagrama representando a arquitetura hexagonal aplicada na API:

```
                       +----------------------------------+
                       |         Cliente / HTTP          |
                       | (adapters/inbound: Controllers) |
                       +----------------------------------+
                                        |
                                        v
                       +----------------------------------+
                       |    Application (Regras de Negócio)   |
                       | (services: Collect, List)       |
                       +----------------------------------+
                                        |
                +------------------------------------------------+
                |            Infrastructure                      |
                | (configuração, middlewares)                   |
                +------------------------------------------------+
                                        |
                   +-------------------------------------------+
                   | Outbound Adapters (Firebase, Token)       |
                   | (firebaseRepository, tokenRepository)     |
                   +-------------------------------------------+
```

---

## 📌 Benefícios da Arquitetura Hexagonal

✅  **Desacoplamento** : Facilita substituições/modificações sem afetar outras camadas.
✅  **Facilidade de Testes** : Permite testar a lógica de negócio sem dependência do Express ou Firebase.
✅  **Escalabilidade** : Estrutura modular que facilita expansão e novas funcionalidades.
✅  **Manutenção Simplificada** : Código mais organizado e de fácil compreensão.

---

## 📜 Conclusão

A implementação da arquitetura hexagonal nesta API proporciona um sistema mais robusto, escalável e flexível. A separação entre interface, lógica de negócio e integração externa garante que mudanças possam ser feitas sem impactar toda a aplicação, promovendo um ambiente de desenvolvimento mais ágil e organizado.
