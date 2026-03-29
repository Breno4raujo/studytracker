import { useEffect, useState } from "react";
import type { Study } from "../types";
import {getStudies, createStudy, updateStudy, deleteStudy, } from "../services/studiesService";

export function useStudies() {
  const [list, setList] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Study[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
  try {
    setLoading(true);
    setError(null);

    const data = await getStudies();
    setList(data);

  } catch {
    setError("Não foi possível conectar ao servidor. Verifique se a API está rodando.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    load();
  }, []);

  const add = async (title: string) => {
  try {
    const newItem = await createStudy(title);
    setList((prev) => [...prev, newItem]);
  } catch {
    setError(" Erro sua nova tarefa não foi criada ");
  }
};

  const updateProgress = async (item: Study, progress: string) => {
  try {
    const updated = {
      progress,
      lastStudiedAt: new Date().toDateString(),
    };

    setList((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, ...updated } : i
      )
    );

    await updateStudy(item.id, updated);

  } catch {
    setError("Erro ao atualizar progresso tente novamente");
  }
};

  const toggle = async (item: Study) => {
  try {
    const updated = { done: !item.done };

    setList((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, ...updated } : i
      )
    );

    await updateStudy(item.id, updated);

  } catch {
    setError("Erro ao atualizar tarefa tente novamente");
  }
};

const remove = async (id: number) => {
  try {
    setList((prev) => prev.filter((i) => i.id !== id));
    await deleteStudy(id);
  } catch {
    setError("Erro sua tarefa não foi deletada");
  }
};



const updateConfidence = async (item: Study, value: number) => {
  try {
    let priority: Study["priority"] = "Media";

    if (value <= 2) priority = "Alta";
    else if (value === 3) priority = "Media";
    else priority = "Baixa";

    const now = new Date();
    let daysToAdd = 1;

    if (value === 3) daysToAdd = 3;
    if (value === 4) daysToAdd = 7;
    if (value === 5) daysToAdd = 15;

    const nextReview = new Date(now);
    nextReview.setDate(now.getDate() + daysToAdd);

    const updated = {
      ...item,
      confidence: value,
      priority,
      nextReview: nextReview.toDateString(),
    };

    setList((prev) =>
      prev.map((i) => (i.id === item.id ? updated : i))
    );

    await updateStudy(item.id, {
      confidence: value,
      priority,
      nextReview: nextReview.toDateString(),
    });

  } catch {
    setError("Erro na sua tentativa de atualizar prioridade");
  }
};

  return {
  list,
  loading,
  error, 
  add,
  toggle,
  remove,
  updateProgress,
  updateConfidence,
};
}