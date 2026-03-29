# 📚 Study Tracker

Aplicação para organização de estudos com foco em reduzir o esforço mental do usuário.

---

## 🧠 Problema

Estudantes autodidatas têm dificuldade em:

* Saber o que estudar no dia
* Lembrar onde pararam
* Organizar revisões
* Manter consistência

---

## 💡 Solução

O Study Tracker organiza automaticamente o fluxo de estudo, permitindo:

* Criar tarefas de estudo
* Registrar progresso
* Avaliar nível de domínio (1 a 5)
* Receber sugestão do que estudar agora
* Visualizar progresso geral

---

## 🚀 Funcionalidades

* CRUD completo de tarefas
* Sugestão inteligente de estudo
* Autoavaliação com impacto na prioridade
* Feedback visual imediato
* Modo dark/light
* Responsivo (mobile + desktop)

---

## 🛠️ Tecnologias

* React
* TypeScript
* Tailwind CSS
* json-server (API REST fake)
* Framer Motion

---

## 📡 API

A aplicação consome uma API REST com json-server.

### Rodar API:

```bash
npx json-server --watch db.json --port 3001
```

---

## 💻 Rodar o projeto

```bash
npm install
npm run dev
```

---

## 🌐 Deploy

(             )

---

## 🧱 Arquitetura

```
src/
  components/
  hooks/
  services/
  pages/
  types.ts
```

* services → chamadas à API
* hooks → lógica de estado
* components → UI reutilizável

---

## ♿ Acessibilidade

* Labels em inputs
* aria-label em botões
* HTML semântico
* Navegação compatível com teclado

---

## 🧠 Decisões

* Interface simples → reduzir esforço mental
* Prioridade automática → evitar indecisão
* Sugestão inteligente → guiar o usuário

---

## ❗ Observações

A aplicação utiliza update otimista para melhorar a experiência do usuário.

---

## 📌 Autor

Breno Araujo

---
