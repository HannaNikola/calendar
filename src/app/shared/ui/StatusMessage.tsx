type StatusMessageProps = {
  type: "delete" | "success" | "confirm" | "error";
  title?: string;
  description: string;

  onCancel?: () => void;
  onConfirm?: () => void;

  cancelText?: string;
  confirmText?: string;
};

export default function StatusMessage({
  type,
  title,
  description,
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
}: StatusMessageProps) {
  const renderIcon = () => {
    switch (type) {
      case "delete":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        );
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#93eca9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-check"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m16 9-5.5 5.5L8 12" />
          </svg>
        );
        default:
      return null;
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-grey-light rounded-sm">
          {renderIcon()}
        </div>

        <p className="mt-3 text-medium font-semibold">{title}</p>

        <p className="text-center text-black-medium">{description}</p>
      </div>

      {(onCancel || onConfirm) && (
        <div className="flex justify-between gap-2 mt-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-grey-button hover:bg-sky-100 px-3 py-1 rounded"
            >
              {cancelText}
            </button>
          )}

          {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-alert-button hover:bg-alert-button-hover text-white px-3 py-1 rounded"
            >
              {confirmText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
