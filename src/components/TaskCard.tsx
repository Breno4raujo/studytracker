import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, Star, Save, SaveOff } from "lucide-react";
import type { Study } from "../types";

type Props = {
  item: Study;
  toggle: (item: Study) => void;
  remove: (id: number) => void;
  updateProgress: (item: Study, progress: string) => void;
  updateConfidence: (item: Study, value: number) => void;
  setTaskToDelete: (item: Study) => void;
  setDeleteModal: (value: boolean) => void;
};

export default function TaskCard({
  item,
  toggle,
  updateProgress,
  updateConfidence,
  setTaskToDelete,
  setDeleteModal,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.progress || "");

  const priorityLabel: Record<"Alta" | "Media" | "Baixa", string> = {
    Alta: "Alta",
    Media: "Média",
    Baixa: "Baixa",
  };

  const priorityColor: Record<"Alta" | "Media" | "Baixa", string> = {
    Alta: "text-red-500",
    Media: "text-yellow-500",
    Baixa: "text-green-500",
  };


  type Priority = Study["priority"];

  const priorityKey: Priority = item.priority ?? "Media";

  const stars = [1, 2, 3, 4, 5,];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="
  group
  bg-white dark:bg-slate-800
  border border-slate-200 dark:border-slate-700
  shadow-sm
  p-5 rounded-2xl
  hover:shadow-md
  transition-all duration-200
  flex flex-col gap-4
"
    >
      {/* topo */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => toggle(item)}
          />
          <span
            className={`font-medium ${item.done
                ? "line-through text-slate-400"
                : "text-slate-900 dark:text-white"
              }`}
          >
            {item.title}
          </span>
        </div>

        <button
          onClick={() => {
            setTaskToDelete(item);
            setDeleteModal(true);
          }}
          className="
  opacity-0 group-hover:opacity-100 
  transition
  text-slate-400 hover:text-red-500
"
        >
          <Trash2 size={30} />
        </button>
      </div>


      {/* prioridade */}
      <p className={`text-xs ${priorityColor[priorityKey]}`}>
        Prioridade: {priorityLabel[priorityKey]}
      </p>

      {/* progresso */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Último progresso: {item.progress || "não iniciado"}
      </p>

      {/* autoavaliação */}
      <div className="flex gap-1 mt-1">
        {stars.map((star) => (
          <button
            key={star}
            onClick={() => updateConfidence(item, star)}
          >
            <Star
              size={20}
              className={
  star <= (item.confidence || 0)
    ? "text-yellow-400"
    : "text-slate-400 hover:text-yellow-300"
}
            />
          </button>
        ))}
      </div>

      {/* editar progresso */}
      {editing ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className=" px-3 py-2 
        rounded-lg 
        border border-slate-300 
        bg-white dark:bg-slate-700 
        text-sm 
        text-slate-800 dark:text-white
        outline-none 
        focus:ring-2 focus:ring-blue-500
      "
            placeholder="Ex: Aula 4, capítulo 2..."
          />

          <div className="flex gap-2">

            {/* salvar */}
            <button
              onClick={() => {
                updateProgress(item, value);
                setEditing(false);
              }}
              className="
          bg-blue-500 hover:bg-blue-600
          px-3 py-2 
          rounded-lg 
          text-white text-xs font-medium
          flex items-center gap-2
          active:scale-95
          transition-all
        "
            >
              <Save size={16} /> Salvar
            </button>

            {/* cancelar */}
            <button
              onClick={() => {
                setValue(item.progress || "");
                setEditing(false);
              }}
              className="
          bg-red-500 hover:bg-red-600
          px-3 py-2 
          rounded-lg 
          text-white text-xs font-medium
          flex items-center gap-2
          active:scale-95
          transition-all
        "
            >
              <SaveOff size={16} /> Cancelar
            </button>

          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="
        bg-emerald-500 hover:bg-emerald-600
        px-3 py-2 
        rounded-lg 
        text-white text-xs font-medium
        flex items-center gap-2
        active:scale-95
        transition-all
      "
          >
            <Pencil size={16} /> Atualizar progresso
          </button>
        </div>
      )}

    </motion.div>

  );
}