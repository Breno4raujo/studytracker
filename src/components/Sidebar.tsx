import React from "react";
import { List, Clock, CheckCircle } from "lucide-react";

export default function Sidebar({ setFilter, filter, closeMobile, mobile }: any) {
  const menu = [
    {
      label: "Todos",
      value: "all",
      icon: List,
      
    },
    {
      label: "Pendentes",
      value: "pending",
      icon: Clock,
    },
    {
      label: "Concluídas",
      value: "done",
      icon: CheckCircle,
    },
  ];

  return (
    <aside className={`
  ${mobile ? "flex w-full" : "hidden md:flex md:flex-col w-64"} pt-6 px-2 `}> 

      {/* Menu */}
      <nav className="flex flex-col gap-2 text-sm px-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = filter === item.value;

          return (
            <button
              key={item.value}
              onClick={() => {
                setFilter(item.value);
                if (closeMobile) closeMobile();
              }}
              className={`
                flex items-center gap-3
                px-4 py-2.5 rounded-xl
                transition-all duration-200
                text-left

                ${active
                  ? "bg-blue-500 text-white shadow-sm"
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                }
              `}
            >
              <Icon size={18} />
              {item.label}
            </button>

          );
        })}
      </nav>
    </aside>
  );
}