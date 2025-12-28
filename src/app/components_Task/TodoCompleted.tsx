"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { TaskItem } from "./TaskItem";
import { closeElementModal } from "../store/sharedComponent/modalReducer";
import { ModalTodo } from "./ModalTodo";
import { fetchTodosApi } from "../api/todoApi";
import { selectFilterResult } from "../store/filters/selector";
import { CalendarTodo } from "../types/typesTodoApi";

export const TodoCompleted = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);
  const { todos, status } = useSelector((state: RootState) => state.todo);
  const query = useSelector((state: RootState) => state.filter.query);
  const queryResult = useSelector(selectFilterResult);

  const isCompletedTodo = todos.filter((item) => item.isCompletedTask);

  const activeTodos: CalendarTodo[] = query
    ? (queryResult as CalendarTodo[])
    : isCompletedTodo;

  return (
    <div className="w-full">
      {status === "loading" || status === "idle" ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
      ) : activeTodos.length === 0 ? (
        <div>
          <p className="text-h2 text-center pt-10">No task for you</p>
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
