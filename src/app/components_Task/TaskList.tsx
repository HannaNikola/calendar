"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { ModalTodo } from "./ModalTodo";
import { closeElementModal } from "../store/sharedComponent/modalReducer";
import { TaskItem } from "./TaskItem";
import { selectFilterResult } from "../store/filters/selector";
import { CalendarTodo } from "../types/typesTodoApi";

export const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.todo);
  const { isOpen, type } = useSelector((state: RootState) => state.modal);
  const queryResult = useSelector(selectFilterResult);
  const entity = useSelector((state: RootState) => state.filter.entity);


  useEffect(() => {
    dispatch(fetchTodosApi());
  }, [dispatch]);

  const activeTodos =
    entity === "todo"
      ? (queryResult as CalendarTodo[]).filter((item) => !item.isCompletedTask)
      : [];

  return (
     <>
  <div className="flex w-full flex-col">
   {status === "loading" || status === "idle" ?  (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
  </div>
) : activeTodos.length === 0 ? (
  <div>
    <p className="text-h2 text-center pt-10">No task for you</p>
  </div>
) : (
  <ul className="flex w-full flex-col">
    {activeTodos.map((item) => (
      <TaskItem key={item._id} item={item} />
    ))}
  </ul>
)}
  </div>

  {type === "todo" && (
    <ModalTodo
      isOpen={isOpen}
      onClose={() => dispatch(closeElementModal())}
    />
  )}
</>
  );
};
