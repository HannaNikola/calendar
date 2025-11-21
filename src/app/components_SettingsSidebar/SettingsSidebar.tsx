"use client";

import { FC, useCallback, useEffect } from "react";

interface SettingsSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsSidebar ({open, onClose}:SettingsSidebarProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
     <>
       <div
        className={`
          fixed inset-0 bg-black/40 transition-opacity z-40
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full 
          w-72 lg:w-96
          bg-white shadow-xl z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium">Settings</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4">
          
         {/* Content */}
        </div>
      </div>
    </>
  );
};
