import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ModalState, ModalType, ModalMode } from "@/app/types/typesModal"




const initialState: ModalState = {
  isOpen: false,
  type: undefined,
  mode: undefined,
   selectedId: null
};

const modalElementSlice = createSlice({
  name: "modalElement",
  initialState,

  reducers: {
    openElementModal: (
      state,
      action: PayloadAction<{ type: ModalType; mode?: ModalMode; selectedId?: string }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode; 
      state.selectedId = action.payload.selectedId ?? null;
    },
    closeElementModal: (state) => {
      state.isOpen = false;
      state.type = undefined;
      state.mode = undefined;
      state.selectedId = null;
    },
  },
});

export const { openElementModal, closeElementModal } = modalElementSlice.actions;
export const modalReducer = modalElementSlice.reducer;



// const TodoSchema = Yup.object().shape({
//   title: Yup.string()
//     .max(70, "Title must be less than 100 characters")
//     .required("Title can’t be empty"),
// });

// interface ModalTodoProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode?: "new" | "update";
// }

// export const ModalTodo = ({ isOpen, onClose }: ModalTodoProps) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { todos } = useSelector((state: RootState) => state.todo);
//   const { selectedId } = useSelector((state: RootState) => state.modal);
//   const { handeDeleteTodo, handelUpdateTodo } = useTodoHandlers();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const titleRef = useRef<HTMLTextAreaElement | null>(null);
//   const descRef = useRef<HTMLTextAreaElement | null>(null);

//   const selectedItem = todos.find((todo) => todo._id === selectedId);

//   useEffect(() => {
//     dispatch(fetchTodosApi());
//   }, [dispatch]);

//   // при выборе новой задачи — обновляем состояние
//   useEffect(() => {
//     if (!selectedItem) return;
//     setTitle(selectedItem.title || "");
//     setDescription(selectedItem.description || "");
//   }, [selectedItem]);

//   // при открытии модалки — выставляем корректные высоты текстовых полей
//   useEffect(() => {
//     if (isOpen) {
//       const adjustHeight = (el: HTMLTextAreaElement | null) => {
//         if (!el) return;
//         el.style.height = "auto";
//         el.style.height = `${el.scrollHeight}px`;
//       };
//       adjustHeight(titleRef.current);
//       adjustHeight(descRef.current);
//     }
//   }, [isOpen, title, description]);

//   const handelTodoSubmit = async () => {
//     if (!selectedItem) return;
//     try {
//       await TodoSchema.validate({ title });
//       await handelUpdateTodo(selectedItem._id, { title, description });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!selectedItem) return null;

//   return (
//     <ModalWrapper
//       isOpen={isOpen}
//       onClose={onClose}
//       className="w-full lg:w-[700px]"
//     >
//       <div className="flex flex-col w-full h-auto">
//         <textarea
//           ref={titleRef}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           onInput={(e) => {
//             e.currentTarget.style.height = "auto";
//             e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
//           }}
//           className="w-full border-0 bg-input-light focus:outline-none focus:bg-hover-input p-1 mb-4 text-main resize-none overflow-hidden min-h-[30px]"
//         />
//         <textarea
//           ref={descRef}
//           placeholder="Type your description..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           onInput={(e) => {
//             e.currentTarget.style.height = "auto";
//             e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
//           }}
//           className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main placeholder:text-gray resize-none overflow-hidden min-h-[40px]"
//         />
//         <div className="flex mt-3 justify-between items-center">
//           <div className="flex">
//             <Button
//               onClick={handelTodoSubmit}
//               variant="default"
//               size="small"
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
//                 className={
//                   selectedItem.isImportant ? "fill-amber-300" : "stroke-black"
//                 }
//               />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 if (selectedItem._id) {
//                   dispatch(
//                     completedTodoApi({
//                       id: selectedItem._id,
//                       isCompleted: !selectedItem.isCompleted,
//                     })
//                   );
//                 }
//               }}
//             >
//               {selectedItem.isCompleted ? (
//                 <CircleCheckBig size={20} />
//               ) : (
//                 <Circle size={20} />
//               )}
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
