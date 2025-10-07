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
    // <div
    //   onClick={handelOverlowClick}
    //   className=" flex fixed inset-0  bg-black/50  items-center justify-center z-50 shadow-2xs p-4 "
    // >
    //   <div
    //     className={`p-4 relative rounded-lg shadow-lg  bg-white mx-auto max-h-[85vh] overflow-y-auto no-scrollbar mt-10 mb-26 ${className}`}
    //   >
    //     {withCloseButton && (
    //       <button
    //         onClick={onClose}
    //         className="absolute top-2 right-2  text-gray-500 hover:text-gray-800"
    //       >
    //         <X size={20} />
    //       </button>
    //     )}
    //     {children}
    //   </div>
    // </div>

     <div
      onClick={handelOverlowClick}
      className=" flex fixed inset-0  bg-black/50  items-center justify-center z-50 shadow-2xs p-4 "
    >
      <div
        className={`p-4 relative rounded-lg shadow-lg  bg-white mx-auto max-h-[85vh] overflow-y-auto no-scrollbar mt-10 mb-26 ${className}`}
      >
        {withCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2  text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
