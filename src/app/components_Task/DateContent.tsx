"use client";

import {  useEffect } from "react";
import {useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import dayjs from "dayjs";
import { fetchTodosApi } from "@/app/api/todoApi";
import { TaskItem } from "@/app/components_Task/TaskItem";

export const  DateContent =() =>{


  const searchParams = useSearchParams();
  const selectedDate = searchParams.get("date");

  const dispatch = useDispatch<AppDispatch>();
  const { todos, status } = useSelector(
    (state: RootState) => state.todo,
  );

  useEffect(() => {
    dispatch(fetchTodosApi());
  }, [dispatch]);

  const filteredTodos = todos
    .filter((todo) => {
      if (!todo.end || !selectedDate || todo.isCompletedTask) return false;

      return dayjs(todo.end).format("YYYY-MM-DD") === selectedDate;
    })
    .sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );

  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 mt-2">
        <h2 className="text-h2">
          Tasks for {selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : ""}
        </h2>
      </div>

      <div className="flex w-full flex-col items-center py-10 px-2">
        {status === "loading" || status === "idle" ? (
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        ) : filteredTodos.length === 0 ? (
          <p className="text-h2 text-center pt-10">
            No tasks for this day
          </p>
        ) : (
          <ul className="flex w-full flex-col">
            {filteredTodos.map((item) => (
              <TaskItem key={item._id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


