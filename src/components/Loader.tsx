import React from "react";

export default function Loader() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-10 bg-slate-700 rounded"></div>
      <div className="h-10 bg-slate-700 rounded"></div>
      <div className="h-10 bg-slate-700 rounded"></div>
    </div>
  );
}