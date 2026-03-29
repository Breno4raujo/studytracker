# 📚 Study Tracker

Aplicação web para gestão de estudos com foco em **reduzir carga cognitiva** e melhorar a retenção através de **revisões inteligentes baseadas em confiança**.

---

## 🎯 Problema

Estudantes autodidatas frequentemente enfrentam dificuldades em manter consistência nos estudos devido a:

* Falta de clareza sobre o que estudar no dia
* Esquecimento do progresso anterior
* Ausência de um sistema simples de revisão
* Sobrecarga mental ao tomar decisões

A maioria das ferramentas é genérica ou complexa demais, o que acaba aumentando a fricção em vez de ajudar.

---

## 💡 Solução

O **Study Tracker** resolve esse problema através de um fluxo guiado de estudo:

* Organização simples de tarefas
* Atualização rápida de progresso
* Sistema de **autoavaliação (1–5)** que define prioridade automaticamente
* Cálculo de **próxima revisão**
* Interface focada em ação, não em configuração

---

## 👤 Público-alvo

Estudantes autodidatas de programação, concursos ou faculdade que:

* Estudam sem acompanhamento formal
* Precisam revisar conteúdos com frequência
* Buscam consistência sem complexidade

---

## 🚀 Funcionalidades

* ✅ CRUD completo de tarefas de estudo
* ✅ Sistema de revisão baseado em nível de confiança
* ✅ Atualização de progresso em tempo real
* ✅ Definição automática de prioridade (Alta / Média / Baixa)
* ✅ Sugestão implícita do que estudar
* ✅ Feedback visual imediato (otimistic UI)
* ✅ Modo dark/light
* ✅ Layout responsivo (mobile-first)

---

## 🧠 Regra de Negócio (Diferencial)

A prioridade e revisão são calculadas com base na confiança:

* 1–2 → Alta prioridade (revisar rápido)
* 3 → Média
* 4–5 → Baixa (intervalo maior)

Isso cria um sistema simples inspirado em **repetição espaçada**, sem complexidade para o usuário.

---

## 🛠️ Tecnologias

* React (componentes funcionais)
* TypeScript (tipagem forte)
* Tailwind CSS (estilização)
* json-server (API REST)
* Framer Motion (animações)

---

## 🧱 Arquitetura

```
src/
  components/   → UI reutilizável
  hooks/        → lógica (useStudies)
  services/     → comunicação com API
  pages/        → composição de telas
  types.ts      → tipagem central
```

✔ Separação clara de responsabilidades
✔ API isolada em services
✔ Custom hook para estado global

---

## 📡 API

API REST simulada com json-server (deployada no Render):

👉 https://study-api-0ejw.onrender.com/studies

### Operações:

* GET → listar estudos
* POST → criar
* PATCH → atualizar
* DELETE → remover

---

## 🔧 Configuração de ambiente

Crie um `.env` baseado no exemplo:

```bash
cp .env.example .env
```

Configure a URL da API:

```env
VITE_API_URL=https://study-api-0ejw.onrender.com/studies
```

---

## 💻 Rodar localmente

```bash
npm install
npm run dev
```

---

## 🌐 Deploy

* Frontend: https://studytracker-tan.vercel.app/
* Backend: https://study-api-0ejw.onrender.com

---

## ♿ Acessibilidade

* Uso de HTML semântico (`main`, `nav`, `section`)
* Inputs com `label`
* Botões com descrição (não apenas ícones)
* Navegação por teclado funcional
* Contraste adequado em modo escuro

---

## ⚙️ Decisões Técnicas

* Uso de **update otimista** para melhor UX
* Separação de lógica com **custom hook**
* Tipagem com `Partial` para updates
* Variáveis de ambiente para flexibilidade
* API desacoplada do frontend

---

## 📈 Melhorias futuras

* Persistência com Firebase
* Sistema de autenticação
* Histórico de revisões
* Dashboard com métricas de estudo

---

## 👨‍💻 Autor

**Breno Araujo**
Desenvolvedor Fullstack em formação
