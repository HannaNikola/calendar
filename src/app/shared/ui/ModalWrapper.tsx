import { X } from "lucide-react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  withCloseButton?: boolean;
}

export const ModalWrapper = ({
  isOpen,
  onClose,
  className,
  withCloseButton = true,
  children,
}: ModalWrapperProps) => {
  if (!isOpen) return null;

  const handelOverlowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handelOverlowClick}
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg  p-4 ${className}`}
      >
        {withCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
