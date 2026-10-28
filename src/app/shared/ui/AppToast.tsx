import toast from "react-hot-toast";
import { CheckCircle2, CircleAlert, Trash2, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "delete" | "info";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    accent: "border-l-4 border-l-emerald-400",
    iconColor: "text-emerald-500",
    title: "SUCCESS",
  },
  error: {
    icon: CircleAlert,
    accent: "border-l-4 border-l-red-400",
    iconColor: "text-red-500",
    title: "ERROR",
  },
  delete: {
    icon: Trash2,
    accent: "border-l-4 border-l-red-400",
    iconColor: "text-red-500",
    title: "DELETE",
  },
  info: {
    icon: Info,
    accent: "border-l-4 border-l-blue-400",
    iconColor: "text-blue",
    title: "Info",
  },
};

function showToast(type: ToastType, description: string) {
  const style = toastStyles[type];
  const Icon = style.icon;

  toast.custom(
    (t) => (
      <div
        className={`
          flex w-[370px] max-w-[calc(100vw-32px)]
          items-start gap-3 rounded-xl
          border border-slate-200
          border-l-4 bg-sky-50/70
          px-4 py-4 shadow-lg
          transition-all duration-300
          ${style.accent}
          ${t.visible ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}
        `}
      >
        <div className="mt-0.5 shrink-0">
          <Icon size={25} strokeWidth={2.2} className={style.iconColor} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-wide text-slate-700">
            {style.title}
          </p>

          <p className="mt-1 break-words text-sm leading-5 text-slate-600">
            {description}
          </p>
        </div>

        <button
          type="button"
          aria-label="Close notification"
          onClick={() => toast.dismiss(t.id)}
          className="
            -mr-1 -mt-1 shrink-0 rounded-md p-1
            text-slate-400 transition-colors
            hover:bg-slate-200/70 hover:text-slate-700
          "
        >
          <X size={17} />
        </button>
      </div>
    ),
    {
      duration: 2000,
      position: "bottom-right",
    },
  );
}

export const appToast = {
  success: (description: string) => showToast("success", description),

  error: (description: string) => showToast("error", description),

  delete: (description: string) => showToast("delete", description),

  info: (description: string) => showToast("info", description),
};
