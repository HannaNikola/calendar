"use client";
import * as Yup from "yup";
import { ModalWrapper } from "../shared/ui/ModalWrapper";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoApi,
  completedTodoApi,
  favoriteTodoApi,
  fetchTodosApi,
} from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { Button } from "../shared/ui/Button";
import { Circle, CircleCheckBig, Star, Trash2 } from "lucide-react";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { TooltipDesktop } from "../shared/ui/Tooltip";
import { AxiosError } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components_Calendar/calendar.css";
import "flatpickr/dist/themes/airbnb.css";

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Title must be less than 100 characters")
    .required("title can`t be empty"),
  description: Yup.string().max(
    600,
    "Description must be less than 600 characters "
  ),
});

interface ModalTodoProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "newTodo" | "editTodo";
}

export const ModalTodo = ({ isOpen, onClose }: ModalTodoProps) => {
  const { handeDeleteTodo, handelUpdateTodo } = useTodoHandlers();
  const dispatch = useDispatch<AppDispatch>();
  const { todos } = useSelector((state: RootState) => state.todo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDay, setEndDay] = useState<Date | null>(null);
  const { data, mode } = useSelector((state: RootState) => state.modal);
  const selectedItem = todos.find((todo) => todo._id === data?.selectedId);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const desRef = useRef<HTMLTextAreaElement | null>(null);

  
  useEffect(() => {
    setTitle(selectedItem?.title || "");
    setDescription(selectedItem?.description || "");
  }, [selectedItem]);

  useEffect(() => {
    if (isOpen) {
      const adjustHeight = (el: HTMLTextAreaElement | null) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      };
      adjustHeight(titleRef.current);
      adjustHeight(desRef.current);
    }
  }, [isOpen, title, description]);

  const handelTodoSubmit = async () => {
    try {
      await TodoSchema.validate({ title, description });

      if (selectedItem?._id) {
        await handelUpdateTodo(selectedItem._id, {
          title,
          description,
          start: endDay,
          end: endDay,
        });
      } else {
        await dispatch(
          addTodoApi({
            title,
            description,
            isImportant: false,
            isCompletedTask: false,
            addTask: true,
            end: endDay,
            allDay: false,
          })
        ).unwrap();
        onClose();
      }
    } catch (error) {
      const err = error as AxiosError;
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      className="w-full lg:w-[700px]  max-h-[85vh]   no-scrollbar max-lg:mt-10 max-lg:mb-28"
    >
      <div className="flex flex-col w-full  mt-4 scrollbar-hide">
        <textarea
          ref={titleRef}
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-1 mb-4 text-main resize-none overflow-hidden min-h-[30px] shadow-md"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
        <textarea
          ref={desRef}
          placeholder="Type your description maximum 600 characters ..."
          value={description}
          maxLength={600}
          onChange={(e) => setDescription(e.target.value)}
          className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main text-justify  placeholder:text-gray resize-none overflow-hidden min-h-[40px] line-clamp-2 shadow-md "
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
        {mode === "editTodo" && (
          <div>
            <p className="mr-3">Change deadline:</p>
            <DatePicker
              selected={endDay}
              onChange={(date) => setEndDay(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              className="w-[200px] text-center bg-input-light rounded focus:outline-none focus:bg-hover-input shadow-md"
            />
          </div>
        )}
        <div className="flex mt-3 justify-between items-center">
          {mode === "editTodo" && (
            <div className="flex  ">
              <Button
                onClick={handelTodoSubmit}
                variant={"default"}
                size={"small"}
                className="mr-7 shadow-md"
              >
                Update
              </Button>
            </div>
          )}
          {mode === "newTodo" && (
            <div className="flex  ">
              <Button
                onClick={handelTodoSubmit}
                variant={"default"}
                size={"small"}
                className="mr-7 shadow-md"
              >
                Add Task
              </Button>

              <p className="mr-3">Deadline:</p>
              <DatePicker
                selected={endDay}
                onChange={(date) => setEndDay(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                className="w-full  max-lg:[200px] text-center bg-input-light rounded focus:outline-none focus:bg-hover-input shadow-md"
              />
            </div>
          )}

          {mode === "editTodo" && (
            <div className="flex gap-3">
              <TooltipDesktop content="Favorite">
                <button
                  className="hover:animate-pulse"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedItem?._id) return;
                    dispatch(
                      favoriteTodoApi({
                        id: selectedItem?._id,
                        isImportant: !selectedItem?.isImportant,
                      })
                    );
                  }}
                >
                  <Star
                    size={20}
                    className={
                      selectedItem?.isImportant
                        ? "fill-amber-300"
                        : "stroke-black"
                    }
                  />
                </button>
              </TooltipDesktop>
              <TooltipDesktop content="Complete task">
                <button
                  className="hover:animate-pulse"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedItem?._id) {
                      dispatch(
                        completedTodoApi({
                          id: selectedItem?._id,
                          isCompletedTask: !selectedItem?.isCompletedTask,
                        })
                      );
                    }
                  }}
                >
                  {selectedItem?.isCompletedTask ? (
                    <CircleCheckBig size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
              </TooltipDesktop>
              <TooltipDesktop content="Delete task">
                <button
                  className="hover:animate-pulse"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedItem?._id) return;
                    handeDeleteTodo(selectedItem._id, true);
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </TooltipDesktop>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
