# 📖 Documentação do Padrão de Projeto - Plugin de Extração de Dados

## 📌 Arquitetura Utilizada: Hexagonal (Ports & Adapters)

O **plugin de extração de dados** foi desenvolvido seguindo a **arquitetura hexagonal** (Ports & Adapters) para garantir modularidade, testabilidade e facilidade de manutenção. Com essa abordagem, a lógica de extração de dados é independente da UI e da API, permitindo maior flexibilidade na sua evolução.

---

## 🏗 Estrutura do Projeto

A organização do projeto foi feita para refletir a separação clara de responsabilidades:

```
📂 src/
├── 📂 adapters/ (Interface de Entrada e Saída)
│   ├── 📂 inbound/ (Interação com a página e usuário)
│   │   ├── buttonController.ts (Gerencia a ativação do plugin via botão)
│   │   ├── pluginLoader.ts (Carrega o plugin na página)
│   │
│   ├── 📂 outbound/ (Comunicação externa)
│   │   ├── apiService.ts (Envia os dados extraídos para a API)
│
├── 📂 ui/ (Manipulação de elementos DOM)
│   ├── domUtils.ts (Gerencia a criação e estilização do botão)
│
├── 📂 application/ (Regras de Negócio)
│   ├── dataCollector.ts (Coleta as informações do dispositivo e página)
│
├── 📂 infrastructure/ (Infraestrutura e persistência)
│   ├── themeRepository.ts (Gerencia o estado do tema)
│   ├── themeTracker.ts (Monitora mudanças no tema)
│
├── 📂 tests/ (Testes unitários)
│   ├── plugin.test.ts (Testes do plugin)
│
├── index.ts (Ponto de entrada do plugin)
```

---

## 🎯 Explicação das Camadas

### 1️⃣ **Adapters (Portas de Entrada e Saída)**

* **Inbound** : Responsável pela interação com a página e o usuário.
* `buttonController.ts` → Escuta eventos do botão e inicia a extração.
* `pluginLoader.ts` → Injeta o script na página e adiciona o botão de ativação.
* **Outbound** : Comunicação com serviços externos.
* `apiService.ts` → Envia os dados coletados para a API backend.

---

### 2️⃣ **UI (Manipulação do DOM)**

* `domUtils.ts` → Responsável por criar e estilizar dinamicamente o botão e outras interações visuais.

---

### 3️⃣ **Application (Regras de Negócio)**

* `dataCollector.ts` → Coleta informações como:
  * Tipo de dispositivo (Android, iOS ou Desktop).
  * Sistema operacional.
  * Domínio da página.
  * Mudanças de tema (Dark/Light Mode).

---

### 4️⃣ **Infrastructure (Infraestrutura e Persistência)**

* `themeRepository.ts` → Gerencia o estado do tema e armazena mudanças.
* `themeTracker.ts` → Monitora e conta quantas vezes o usuário alterou o tema da página.

---

## 🛠 Fluxo de Funcionamento do Plugin

1️⃣ O `pluginLoader.ts` adiciona dinamicamente um botão na página.

2️⃣ O usuário clica no botão → `buttonController.ts` ativa a extração.

3️⃣ O `dataCollector.ts` coleta os dados do navegador.

4️⃣ O `themeTracker.ts` monitora quantas vezes o tema foi alterado.

5️⃣ Os dados são enviados para a API via `apiService.ts`.

---

## 📌 Diagrama da Arquitetura

```plaintext
                      +-----------------------+
                      |    Web Page (DOM)     |
                      +-----------------------+
                                 |
                      +-----------------------+
                      |  Plugin Loader (UI)   |  ⬅ [pluginLoader.ts]
                      +-----------------------+
                                 |
          +--------------------------------------------------+
          |        Application (Regras de Negócio)          |
          |-------------------------------------------------|
          | - dataCollector.ts  (Extração de dados)        |
          | - themeTracker.ts (Monitoramento de tema)      |
          +-------------------------------------------------+
                                 |
                      +-----------------------+
                      |  API Service (Envio)  |  ⬅ [apiService.ts]
                      +-----------------------+
                                 |
                      +-----------------------+
                      |     Backend API       |
                      +-----------------------+
```

---

## 📌 Benefícios da Arquitetura Hexagonal no Plugin

✅ **Facilidade de Testes** → Como a lógica do plugin é separada, podemos testar a extração de dados e envio de informações de forma isolada.

✅ **Flexibilidade** → O plugin pode ser facilmente adaptado para enviar dados para outra API sem afetar a lógica central.

✅ **Modularidade** → Alterações no botão ou na UI não afetam a lógica de extração e vice-versa.

✅ **Desacoplamento** → O plugin não depende de tecnologias específicas da página onde será injetado.

---

## 🧪 Testes Unitários Implementados

* **Testar se o plugin é injetado corretamente na página.**
* **Testar se o botão de ativação dispara a extração.**
* **Testar se os dados extraídos estão corretos.**
* **Testar o envio correto dos dados para a API.**

---

## 🚀 Como Rodar o Projeto?

### **1️⃣ Instalar dependências**

```sh
yarn install
```

### **2️⃣ Criar o build para criar o plugin**

```sh
yarn dev
```

### **3️⃣ Rodar o plugin**

```sh
yarn dev
```

---

## 📋 Conclusão

A arquitetura hexagonal foi aplicada para tornar o plugin desacoplado e modular, garantindo  **facilidade de manutenção** , **testabilidade** e  **extensibilidade** . Essa abordagem permite que o plugin seja usado em qualquer página sem modificações na lógica principal. 🚀
