import type { Study } from "../types";

const API_URL = "http://localhost:3000/studies";

// GET
export const getStudies = async (): Promise<Study[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Erro ao buscar estudos");

  return res.json();
};

// POST
export const createStudy = async (title: string): Promise<Study> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      done: false,
      progress: "",
      lastStudiedAt: "",
      priority: "Media",
      confidence: 0,
    }),
  });

  if (!res.ok) throw new Error("Erro ao criar estudo");

  return res.json();
};

// PATCH 
export const updateStudy = async (
  id: number,
  data: Partial<Study>
): Promise<Study> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar estudo");

  return res.json();
};

// DELETE
export const deleteStudy = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar estudo");
};