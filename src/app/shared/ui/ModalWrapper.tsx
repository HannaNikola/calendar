import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [visible, setIsVisible] = useState(isOpen);
  const [animate, setanimAte] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => setanimAte(true));
    } else {
      setanimAte(false);
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handelOverlowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      onClick={handelOverlowClick}
      className={`fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300
         ${animate ? "bg-black/50 opacity-100" : "opacity-0"}`}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg  p-4 transform transition-all duration-300
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
           ${className}`}
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
