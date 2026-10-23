import { LogOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchDeletedUser, fetchLogoutUser } from "../api/authApi";
import { ModalWrapper } from "../shared/ui/ModalWrapper";
import { appToast } from "../shared/ui/AppToast";

interface SettingsSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsSidebar({
  open,
  onClose,
}: SettingsSidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const handleDeleteAccount = async () => {
    try {
      await dispatch(fetchDeletedUser()).unwrap();

      setDeleteOpen(false);
      appToast.success("Your account has been successfully deleted.");

      setTimeout(() => {
        router.replace("/register");
      }, 3000);
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };
  const formattedName = user?.name
    ?.trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
          fixed top-17 right-5 rounded-2xl h-[500px]  p-4
          w-[350px]
          bg-white shadow-xl z-50
          transition-transform duration-300
          ${open ? "right-5 translate-x-0" : "right-5 translate-x-[calc(100%+1.25rem)]"}
         
        `}
      >
        <div className=" flex  justify-between items-center mb-4">
          <h2 className=" flex text-lg justify-center font-medium">Settings</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex flex-col bg-sky-100 h-[110px] rounded-xl justify-center items-center mb-10">
          <div className="flex  mt-3 mb-3 w-11 h-11 border-2 rounded-4xl "></div>
          <p className=" flex  text-main  sm:block">{formattedName}</p>
        </div>

        <div className="flex flex-col mt-58">
          <button
            onClick={() => {
              dispatch(fetchLogoutUser());
              router.replace("/login");
            }}
            type="button"
            className="flex items-center py-1 px-17 justify-center w-full mb-3 bg-sky-100 rounded-sm whitespace-nowrap  transition-colors duration-500 text-main   hover:bg-navbar-button-hover"
          >
            Leave an account
            <LogOut size={15} className="ml-3" />
          </button>
          <button
            type="button"
            className="w-full bg-alert-button rounded-sm py-1 px-17 hover:bg-alert-button-hover"
            onClick={() => {
              setDeleteOpen(true);
            }}
          >
            Delete account
          </button>
        </div>
      </div>
      {deleteOpen && (
        <ModalWrapper
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          className="flex w-[350px] top-17 right-5 p-5 "
        >
          <>
            <div className="w-full">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-grey-light rounded-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-grey-light">
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
                  </div>
                </div>

                <p className="mt-3 text-medium font-semibold">DELETE</p>

                <p className="text-center text-black-medium">
                  Are you sure you want to delete your account? All of your data
                  will be permanently deleted.
                </p>
              </div>

              <div className="flex justify-between gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="bg-grey-button hover:bg-sky-100 px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="bg-alert-button hover:bg-alert-button-hover text-white px-3 py-1 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        </ModalWrapper>
      )}
    </>
  );
}
