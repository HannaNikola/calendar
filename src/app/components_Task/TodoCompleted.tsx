"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";
import { closeElementModal } from "../store/sharedComponent/modalReducer";
import { ModalTodo } from "./ModalTodo";
import { fetchTodosApi } from "../api/todoApi";
import { selectFilterResult } from "../store/filters/selector";
import { CalendarTodo } from "../types/typesTodoApi";

export const TodoCompleted = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, type} = useSelector(
    (state: RootState) => state.modal
  );
  const { todos, status } = useSelector((state: RootState) => state.todo);
    const query = useSelector((state: RootState) => state.filter.query);

  const queryResult = useSelector(selectFilterResult);
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

const isCompletedTodo = todos.filter((item)=> item.isCompleted)

const activeTodos: CalendarTodo[] = query ? (queryResult as CalendarTodo[]) : isCompletedTodo

  return (
    <div className="w-full">
      {showLoader ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
      ) : (
        <ul>
          {activeTodos.map((item) => (
            <TaskItem key={item._id} item={item} />
          ))}
        </ul>
      )}
      {type === "todo" && (
        <ModalTodo
          isOpen={isOpen}
          onClose={() => dispatch(closeElementModal())}
        />
      )}
    </div>
  );
};
