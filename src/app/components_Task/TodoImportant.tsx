"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { TaskItem } from "./TaskItem";
import { useEffect, useState } from "react";
import { ModalTodo } from "./ModalTodo";
import { closeElementModal } from "../store/sharedComponent/modalReducer";

export const TodoImportant = () => {
   const dispatch = useDispatch<AppDispatch>();
  const { todos, status } = useSelector((state: RootState) => state.todo);
  const isImportantTodo = todos.filter((item) => item.isImportant);
  const { isOpen, type, selectedItem } = useSelector(
    (state: RootState) => state.modal
  );
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      const timeout = setTimeout(() => setShowLoader(true), 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowLoader(false);
    }
  }, [status]);

 

  return (
    <div className="w-full">
      {showLoader ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
      ) : (
        <ul>
          {isImportantTodo.map((item) => (
            <TaskItem key={item._id} item={item} />
          ))}
        </ul>
      )}
      {type === "todo" && (
              <ModalTodo
                isOpen={isOpen}
                onClose={() => dispatch(closeElementModal())}
                selectedItem={selectedItem}
              />
            )}
    </div>
  );
};
