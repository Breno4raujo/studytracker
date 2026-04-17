# 📌 Mini PRD — Study Tracker

## 🧠 Problema

Estudantes autodidatas, principalmente iniciantes em tecnologia, têm dificuldade em manter consistência nos estudos.

Os principais problemas são:

* Não saber o que estudar no dia
* Esquecer onde pararam
* Ter uma falsa sensação de aprendizado
* Perder tempo decidindo o que fazer

Isso gera desorganização, frustração e abandono dos estudos.

---

## 👤 Usuário

Estudantes autodidatas de tecnologia (ex: programação), que estudam sozinhos e não têm uma estrutura fixa.

Exemplo:

> Pessoa estudando programação por conta própria tentando entrar no mercado.

---

## 🎯 Objetivo

Reduzir o esforço mental do usuário na organização dos estudos, ajudando ele a:

* Saber exatamente o que estudar agora
* Retomar rapidamente o progresso
* Visualizar evolução
* Ajustar sua percepção de aprendizado

---

## ⚙️ Funcionalidades Essenciais

### 1. Criar tarefa de estudo

Permite registrar o que precisa estudar.

Sem isso, o sistema não existe.

---

### 2. Atualizar progresso

Permite registrar onde parou.

Sem isso, o usuário perde contexto.

---

### 3. Marcar como concluído

Permite acompanhar progresso geral.

---

### 4. Autoavaliação (1–5 estrelas)

Usuário avalia o quanto domina o conteúdo.

Isso alimenta a priorização inteligente.

---

### 5. Sugestão automática do que estudar

O sistema decide a próxima tarefa com base em:

* prioridade
* nível de confiança
* data de revisão

Sem isso, o problema principal (decidir o que estudar) não é resolvido.

---

### 6. Deletar tarefa

Permite manter o sistema limpo e relevante.

---

## 🧱 Decisões Técnicas

### API REST (json-server)

#### Entidade: Study

```json
{
  "id": 1,
  "title": "React Hooks",
  "done": false,
  "progress": "useEffect",
  "lastStudiedAt": "date",
  "priority": "Alta",
  "confidence": 2,
  "nextReview": "date"
}
```

---

### Endpoints utilizados

* GET /studies → listar tarefas
* POST /studies → criar tarefa
* PATCH /studies/:id → atualizar progresso / estado
* DELETE /studies/:id → remover tarefa

---

## 🧠 Decisões de Produto

* Prioridade automática baseada na confiança
* Sistema sugere o que estudar (reduz decisão)
* Feedback visual imediato (UX rápida)
* Interface simples e direta

---

## 🚫 O que NÃO faz (por decisão)

* Sistema de login
* Categorias complexas
* Gamificação

Motivo: manter foco na simplicidade e reduzir carga mental.

---
