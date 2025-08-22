"use client";
import { ModalWrapper } from "../shared/ui/ModalWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";

interface ModalTodoProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "new" | "update";
  selectedTodo?: any;
  
}

export const ModalTodo = ({
  isOpen,
  onClose,
  selectedTodo,
}: ModalTodoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos} = useSelector((state: RootState) => state.todo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTodosApi());
  }, [dispatch]);

  useEffect(() => {
  if (selectedTodo?.title) {
    setTitle(selectedTodo.title);
  } 
  if(selectedTodo?.description){
    setDescription(selectedTodo.description)
  }


}, [selectedTodo]);
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} className="w-full lg:w-[700px]">
      <div className="flex flex-col w-full">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-none rounded  border-b-black bg-input-light focus:outline-none focus:bg-hover-input p-1 mb-4 text-main resize-none overflow-hidden min-h-[15px] "
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
      </div>
    </ModalWrapper>
  );
};
