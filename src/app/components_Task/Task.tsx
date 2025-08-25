"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { BellRing, CircleCheckBig, Star, Trash2 } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { ModalTodo } from "./ModalTodo";
import { openElementModal, closeElementModal} from "../store/sharedComponent/modalReducer";




export const TaskEl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, status} = useSelector((state: RootState) => state.todo);
  const {isOpen, type, selectedItem} = useSelector((state: RootState)=> state.modal)
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      const timeout = setTimeout(() => setShowLoader(true), 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowLoader(false);
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchTodosApi());
  }, [dispatch]);

  return (
    
    <div className="flex w-full flex-col ">
       {showLoader ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
      ) : (<ul className="flex  w-full flex-col  ">
        {todos.length === 0 ? (
          <li>You dont have any task yet...</li>
        ) : (
          todos.map((item) => (
            <li
              key={item._id}
              onClick={() => dispatch(openElementModal({ type: "todo", selectedItem: item }))}
              className="flex  w-full  justify-between mb-2 border rounded-md border-grey-border px-3 py-3 "
            >
              <div className="flex w-full flex-col mr-3 ">
                <p className="text-sky-dark">{item.title}</p>
                <p className="text-small mb-3">{item.description}</p>
                <div className="flex items-end mt-auto">
                  <Button variant={'default'} size={'small'} className="mr-3 text-small ">Update</Button>
                  <button ><BellRing size={20}/></button>
                </div>
              </div>

              <div className="flex max-lg:flex-col gap-3">
                <button>
                  <Star size={20} />
                </button>
                <button>
                  <CircleCheckBig size={20} />
                </button>
                <button>
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>)}
      
      {type === 'todo' && (
        <ModalTodo
        isOpen={isOpen}
        onClose={() => dispatch(closeElementModal())}
        selectedTodo={selectedItem}/>
      )}
    </div>
  );
};
