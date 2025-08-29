"use client";
import * as Yup from "yup";
import { ModalWrapper } from "../shared/ui/ModalWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteTodoApi, fetchTodosApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { Button } from "../shared/ui/Button";
import { BellRing, CircleCheckBig, Star, Trash2 } from "lucide-react";
import { useTodoHandlers } from "../hooks/useTodoHandlers";


// const TodoSchema = Yup.object().shape({
//   title: Yup.string()
//     .max(70, "Title must be less than 100 characters")
//     .required("title can`t be empty"),
// });

// interface ModalTodoProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode?: "new" | "update";
//   selectedItem?: any;
// }

// export const ModalTodo = ({ isOpen, onClose }: ModalTodoProps) => {
//   const { handeDeleteTodo, handelUpdateTodo } = useTodoHandlers();
//   const dispatch = useDispatch<AppDispatch>();
//   const { todos } = useSelector((state: RootState) => state.todo);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const { selectedItem, type } = useSelector((state: RootState) => state.modal);

//   useEffect(() => {
//     dispatch(fetchTodosApi());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedItem?.title) {
//       setTitle(selectedItem.title);
//     }
//     if (selectedItem?.description) {
//       setDescription(selectedItem.description);
//     }
//   }, [selectedItem]);

//   const handelTodoSubmit = async () => {
//     try {
//       await TodoSchema.validate({ title });

//       await handelUpdateTodo(selectedItem._id, {
//         title,
//         description,
//       });
//     } catch (error) {
      
//     }
//   };

//   return (
//     <ModalWrapper
//       isOpen={isOpen}
//       onClose={onClose}
//       className="w-full lg:w-[700px]"
//     >
//       <div className="flex flex-col w-full">
//         <textarea
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border-0  bg-input-light focus:outline-none focus:bg-hover-input p-1 mb-4 text-main resize-none overflow-hidden h-[30px]"
//           onInput={(e) => {
//             e.currentTarget.style.height = "auto";
//             e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
//           }}
//         />
//         <textarea
//           placeholder="Type your description..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main placeholder:text-gray resize-none overflow-hidden min-h-[40px] "
//           onInput={(e) => {
//             e.currentTarget.style.height = "auto";
//             e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
//           }}
//         />
//         <div className="flex mt-3 justify-between items-center">
//           <div className="flex  ">
//             <Button
//               onClick={handelTodoSubmit}
//               variant={"default"}
//               size={"small"}
//               className="mr-7"
//             >
//               Update
//             </Button>
//             <button>
//               <BellRing size={20} />
//             </button>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 dispatch(
//                   favoriteTodoApi({
//                     id: selectedItem._id,
//                     isImportant: !selectedItem.isImportant,
//                   })
//                 );
//               }}
//             >
//               <Star
//                 size={20}
//                 className={selectedItem.isImportant ? "fill-amber-300" : "stroke-black"}
//               />
//             </button>
//             <button>
//               <CircleCheckBig size={20} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handeDeleteTodo(selectedItem._id, true);
//               }}
//             >
//               <Trash2 size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </ModalWrapper>
//   );
// };





const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .max(70, "Title must be less than 100 characters")
    .required("title can`t be empty"),
});

interface ModalTodoProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "new" | "update";
  selectedItem?: any;
}

export const ModalTodo = ({ isOpen, onClose }: ModalTodoProps) => {
  const { handeDeleteTodo, handelUpdateTodo } = useTodoHandlers();
  const dispatch = useDispatch<AppDispatch>();
  const { todos } = useSelector((state: RootState) => state.todo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { selectedItem, type } = useSelector((state: RootState) => state.modal);

 
  useEffect(() => {
    if (selectedItem?.title) {
      setTitle(selectedItem.title);
    }
    if (selectedItem?.description) {
      setDescription(selectedItem.description);
    }
  }, [selectedItem]);

  const handelTodoSubmit = async () => {
    try {
      await TodoSchema.validate({ title });

      await handelUpdateTodo(selectedItem._id, {
        title,
        description,
      });
    } catch (error) {
      
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      className="w-full lg:w-[700px]"
    >
      <div className="flex flex-col w-full">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-0  bg-input-light focus:outline-none focus:bg-hover-input p-1 mb-4 text-main resize-none overflow-hidden h-[30px]"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
        <textarea
          placeholder="Type your description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main placeholder:text-gray resize-none overflow-hidden min-h-[40px] "
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
        <div className="flex mt-3 justify-between items-center">
          <div className="flex  ">
            <Button
              onClick={handelTodoSubmit}
              variant={"default"}
              size={"small"}
              className="mr-7"
            >
              Update
            </Button>
            <button>
              <BellRing size={20} />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  favoriteTodoApi({
                    id: selectedItem._id,
                    isImportant: !selectedItem.isImportant,
                  })
                );
              }}
            >
              <Star
                size={20}
                className={selectedItem.isImportant ? "fill-amber-300" : "stroke-black"}
              />
            </button>
            <button>
              <CircleCheckBig size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handeDeleteTodo(selectedItem._id, true);
              }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
