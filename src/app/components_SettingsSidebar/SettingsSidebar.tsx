import { LogOut } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchDeletedUser, fetchLogoutUser } from "../api/authApi";

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
  console.log("user", user);
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

        <div className="flex flex-col bg-sky-100 h-[110px] justify-center items-center mb-10">
          <div className="flex  mt-3 mb-3 w-11 h-11 border-2 rounded-4xl "></div>
          <p className=" flex  text-main  sm:block">{user?.name}Name</p>
        </div>

        <div className="flex flex-col mt-60">
          <button className="flex items-center justify-center w-full mb-3 bg-sky-100 whitespace-nowrap  transition-colors duration-500 text-main   hover:text-sky-hover">
            Leave an account
            <LogOut
              onClick={() => {
                dispatch(fetchLogoutUser());
                router.replace("/login");
              }}
              size={15}
              className="ml-3"
            />
          </button>
          <button
            className="w-full bg-alert-button"
            onClick={() => {
              dispatch(fetchDeletedUser());
              router.replace("/register");
            }}
          >
            Delete account
          </button>
        </div>
      </div>
    </>
  );
}
