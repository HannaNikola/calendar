"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { ModalTodo } from "./ModalTodo";
import { closeElementModal } from "../store/sharedComponent/modalReducer";

import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { todos, status } = useSelector((state: RootState) => state.todo);
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

  useEffect(() => {
    dispatch(fetchTodosApi());
  }, [dispatch]);


  return (
    <>
      <div className="flex w-full flex-col ">
        {showLoader ? (
           <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
        ) : (
          <ul className="flex w-full flex-col">
            {
              todos.map((item) => <TaskItem key={item._id} item={item} />)
            }
          </ul>
        )}
      </div>

      {type === "todo" && (
        <ModalTodo
          isOpen={isOpen}
          onClose={() => dispatch(closeElementModal())}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
};
