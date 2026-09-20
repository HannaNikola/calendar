import toast from "react-hot-toast";
import StatusMessage from "./StatusMessage";


export const appToast = {
  success: (description: string) => {
    toast.custom(
      <div className="w-[350px] rounded-xl bg-white p-5 shadow-xl">
        <StatusMessage
          type="success"
          title="Success"
          description={description}
        />
      </div>,
       {
    duration: 500,
  },
    );
  },

  error: (description: string) => {
    toast.custom(
      <div className="w-[350px] rounded-xl bg-white p-5 shadow-xl">
        <StatusMessage
          type="error"
          title="Error"
          description={description}
        />
      </div>,
       {
    duration: 500,
  },
    );
  },
  delete: (description: string) => {
    toast.custom(
      <div className="w-[350px] rounded-xl bg-white p-5 shadow-xl">
        <StatusMessage
          type="delete"
          title="Delete"
          description={description}
        />
      </div>,
       {
    duration: 500,
  },
    );
  },
};