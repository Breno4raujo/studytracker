import { useState, useEffect, useMemo } from "react";
import type { Study } from "../types";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import { useStudies } from "../hooks/useStudies";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, BookOpen, Play, Pin, X, Menu, Save, SaveOff, Loader2 } from "lucide-react";


export default function Home() {
  const { list, loading, error, add, toggle, remove, updateProgress, updateConfidence } = useStudies();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Study | null>(null);
  const [progressInput, setProgressInput] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Study | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState("");


  const filtered = list.filter((item: Study) => {
    if (filter === "done") return item.done;
    if (filter === "pending") return !item.done;
    return true;
  });

  const completedCount = list.filter((i: Study) => i.done).length;
  const totalCount = list.length;
  const progressPercent = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  const today = new Date().toDateString();

  const priorityOrder: Record<"Alta" | "Media" | "Baixa", number> = {
    Alta: 0,
    Media: 1,
    Baixa: 2,
  };

  const sortedList = useMemo(() => {
    return [...list].sort(
      (a, b) =>
        priorityOrder[(a.priority || "Media") as "Alta" | "Media" | "Baixa"] -
        priorityOrder[(b.priority || "Media") as "Alta" | "Media" | "Baixa"]
    );
  }, [list]);

  const filteredList = sortedList.filter((item: Study) => {
    if (filter === "done") return item.done;
    if (filter === "pending") return !item.done;
    return true;
  });

  const todayTasks = filteredList.filter(
    (item: Study) => item.lastStudiedAt === today
  );

  const backlogTasks = filteredList.filter(
    (item: Study) => item.lastStudiedAt !== today
  );

  const score = (item: Study) => {
    const confidence = item.confidence ?? 0;
    const review = new Date(item.nextReview || 0).getTime();
    const now = Date.now();

    const reviewWeight = review < now ? -100000 : review;

    return confidence * 100000 + reviewWeight;
  };

  const todayList = sortedList
    .filter(item => !item.done)
    .sort((a, b) => score(a) - score(b))
    .slice(0, 5);

  const nextTask = todayList[0] || null;

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <main className={`${dark ? "dark" : ""} font-sans`}>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">

        <Sidebar setFilter={setFilter} filter={filter} closeMobile={() => setMobileMenuOpen(false)} />

        <section className="flex-1 p-8 max-w-3xl mx-auto w-full">

          {/* header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Study Tracker
            </h1>

            <button
              onClick={() => setDark(!dark)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
    bg-slate-100 dark:bg-slate-800
    hover:bg-slate-200 dark:hover:bg-slate-700 
    transition"
            >
              {dark ? <Sun size={30} className="text-yellow-400" /> : <Moon size={30} className="text-slate-700" />}
            </button>
          </div>

{error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}


          {/* input */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">

            <label htmlFor="title" className="sr-only">
              Nova tarefa
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nova tarefa..."
            />

            <button
              onClick={async () => {
                if (!title || adding) return;

                setAdding(true);
                await Promise.all([
                  add(title),
                  new Promise((resolve) => setTimeout(resolve, 200))
                ]);
                setToast("Tarefa criada com sucesso");
                setTitle("");
                setAdding(false);
              }}
              className="btn-primary px-5 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={adding}
            >
              {adding ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Criando...
                </>
              ) : (
                "Adicionar"
              )}
            </button>
          </div>

          {/* SUGESTÃO INTELIGENTE */}
          {nextTask && (
            <div className="card p-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">

              <div>
                <p className="text-sm text-slate-500">Sugestão para agora</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {nextTask.title}
                </p>
                <p className="text-xs text-slate-500">
                  Último progresso: {nextTask.progress || "não iniciado"}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedTask(nextTask);
                  setProgressInput(nextTask.progress || "");
                  setModalOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2"
              >
                <Play size={16} /> Começar Agora
              </button>

            </div>
          )}

          {/* loading */}
          {loading && <Loader />}


          <div className="mb-6">
            <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Seu progresso geral</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-1">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-slate-500">
              {completedCount} de {totalCount} concluídas
            </p>
          </div>

          {/* MODAL DELETE */}
          {modalOpen && selectedTask && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              <div className="
  bg-white dark:bg-slate-800
  p-6 rounded-2xl
  shadow-2xl
  animate-in fade-in zoom-in
">

                <h2 className="text-lg font-semibold mb-4">
                  <span className="text-slate-700 dark:text-slate-200" >Até onde você chegou em "{selectedTask?.title}" dessa vez?</span>
                </h2>

                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {selectedTask?.title}
                </p>

                <input
                  value={progressInput}
                  onChange={(e) => setProgressInput(e.target.value)}
                  className="w-full p-2 mb-4 rounded-lg 
        border border-slate-300 
        bg-white dark:bg-slate-700 
        text-sm 
        text-slate-800 dark:text-white
        outline-none"
                  placeholder="Ex: Aula 4, capítulo 2..."
                />

                <div className="flex justify-end gap-2">

                  <button
                    onClick={() => setModalOpen(false)}
                  >
                    <span className="
          bg-red-500 hover:bg-red-600
          px-3 py-2 
          rounded-lg 
          text-white text-xs font-medium
          flex items-center gap-2
          active:scale-95
          transition-all hover:underline"> <SaveOff size={16} />Cancelar</span>
                  </button>

                  <button
                    onClick={() => {
                      updateProgress(selectedTask, progressInput);
                      setModalOpen(false);
                    }}
                    className="
          bg-blue-500 hover:bg-blue-600
          px-3 py-2 
          rounded-lg 
          text-white text-xs font-medium
          flex items-center gap-2
          active:scale-95
          transition-all"
                  >
                    <Save size={16} /> Salvar
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* MODAL DELETE */}
          {deleteModal && (
            <div className="
  fixed inset-0 z-50
  flex items-center justify-center
  bg-black/40 backdrop-blur-sm
">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-sm">

                <h2 className="mb-4 font-semibold text-center text-slate-800 dark:text-white">
                  Deseja deletar definitivamente?
                </h2>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:underline"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => {
                      if (taskToDelete) {
                        remove(taskToDelete.id as number);
                      }
                      setDeleteModal(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Deletar
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* HOJE */}
          <h2 className="flex items-center gap-2 text-lg font-semibold mt-6 mb-2">
            <Pin size={28} className="text-blue-500" /> <span className="text-slate-700 dark:text-slate-200 font-medium" >Hoje</span>
          </h2>

          {todayTasks.length === 0 && (
            <p className="text-sm text-gray-400 mb-3">
              Nenhuma atividade hoje — bora começar uma nova?
            </p>
          )}

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {todayTasks.map((item: Study) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  toggle={toggle}
                  remove={remove}
                  updateProgress={updateProgress}
                  updateConfidence={updateConfidence}
                  setTaskToDelete={setTaskToDelete}
                  setDeleteModal={setDeleteModal}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* BACKLOG */}
          <h2 className="flex items-center gap-2 text-lg font-semibold mt-8 mb-2">
            <BookOpen size={28} className="text-purple-500" /> <span className="text-slate-700 dark:text-slate-200 font-medium" >Anteriores</span>
          </h2>

          <div className="space-y-3">
            <AnimatePresence>
              {backlogTasks.map((item: Study) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  toggle={toggle}
                  remove={remove}
                  updateProgress={updateProgress}
                  updateConfidence={updateConfidence}
                  setTaskToDelete={setTaskToDelete}
                  setDeleteModal={setDeleteModal}
                />
              ))}
            </AnimatePresence>
          </div>
          {!loading && filtered.length === 0 && (
            <p className="text-gray-400 mt-4">
              Nenhuma tarefa encontrada
            </p>
          )}

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex">

              {/* overlay */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* sidebar animada */}
              <motion.div
                drag="x"
                dragConstraints={{ left: -300, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -100) {
                    setMobileMenuOpen(false);
                  }
                }}
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.25 }}
                className="relative w-72 bg-white dark:bg-slate-950 p-6 z-50 shadow-xl flex flex-col"
              >



                {/* header da sidebar */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg">Menu</h2>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* sidebar conteúdo */}
                <Sidebar
                  setFilter={setFilter}
                  filter={filter}
                  mobile
                  closeMobile={() => setMobileMenuOpen(false)}
                />


              </motion.div>
            </div>
          )}

        </section>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="
        fixed bottom-6 right-6 z-50
        bg-slate-900 text-white
        px-4 py-3 rounded-xl shadow-lg
        text-sm font-medium
      "
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>



    </main>
  );
}