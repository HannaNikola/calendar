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
          <div>Loading...</div>
        ) : (
          <ul className="flex w-full flex-col">
            {todos.length === 0 ? (
              <li>You dont have any task yet...</li>
            ) : (
              todos.map((item) => <TaskItem key={item._id} item={item} />)
            )}
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
