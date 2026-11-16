"use client";
import * as Yup from "yup";
import { ModalWrapper } from "../shared/ui/ModalWrapper";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoApi, completedTodoApi, favoriteTodoApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { Button } from "../shared/ui/Button";
import {
  Circle,
  CircleCheckBig,
  Star,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { TooltipDesktop } from "../shared/ui/Tooltip";
import { AxiosError } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components_Calendar/calendar.css";
import "flatpickr/dist/themes/airbnb.css";
import dayjs from "dayjs";


const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Title must be less than 100 characters")
    .required("title can`t be empty"),
  description: Yup.string().max(
    500,
    "Description must be less than 600 characters ",
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
  const linkedEvents = useSelector((state: RootState) =>
    state.eventData.events.find(
      (event) => event._id === selectedItem?.eventId?._id,
    ),
  );

  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const desRef = useRef<HTMLTextAreaElement | null>(null);

  const formatDate = (date: string | Date) =>
  dayjs(date).format("DD/MM/YYYY HH:mm");

  useEffect(() => {
    if (!selectedItem) return;
    setTitle(selectedItem?.title || "");
    setDescription(selectedItem?.description || "");
    setEndDay(selectedItem.end ? new Date(selectedItem.end) : null);
  }, [selectedItem]);

  useEffect(() => {
    if (!isOpen) return;

    const adjustHeight = (
      el: HTMLTextAreaElement | null,
      minHeight: number,
    ) => {
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
    };

    adjustHeight(titleRef.current, 40);
    adjustHeight(desRef.current, 150);
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
            end: endDay,
          }),
        ).unwrap();
      }
      onClose();
    } catch (error) {
      const err = error as AxiosError;
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      className="w-full lg:w-[700px] max-h-[85vh] overflow-y-auto overscroll-contain max-lg:mt-10 max-lg:mb-28"
    >
      <div
        className="flex flex-col w-full min-h-0 max-h-[calc(85dvh-2rem)] overflow-y-auto scrollbar-hide
           overscroll-contain touch-pan-y"
      >
        {mode === "editTodo" && linkedEvents && (
          <div className="mb-2 w-full min-w-0 border-2 p-2 rounded-2xl border-gray-200 bg-gray-medium-background overflow-hidden">
            <div className=" flex w-[210px] px-2 py-0.5 border-none rounded-2xl bg-navbar-button-hover">
              <p className="flex">
                <span>
                  <CalendarDays size={20} className="mr-1" />
                </span>
                event
              </p>
              <p className="w-full min-w-0 truncate text-main ">
                {linkedEvents?.start && formatDate(linkedEvents.start)}
              </p>
            </div>
            <p className="w-full text-sky-dark min-w-0 truncate ">
              {linkedEvents?.title}
            </p>
          </div>
        )}
        <div className=" w-full border border-sky-300 p-2 rounded bg-sky-50/90 shadow-sm">
          <div className="flex justify-between items-center">
            <p className="text-small">Task Title</p>
            {mode === "editTodo" && (
              <div className="flex  gap-3">
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
                        }),
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
                          }),
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
              </div>
            )}
          </div>
          <textarea
            ref={titleRef}
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full box-border border border-sky-300 rounded bg-sky-100/70 focus:outline-none focus:bg-hover-input min-h-[40px] p-2 mb-2 text-main resize-none overflow-hidden shadow-sm"
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          <p className="text-small">Description</p>

          <textarea
            ref={desRef}
            placeholder="Type your description maximum 600 characters ..."
            value={description}
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full box-border border border-sky-300 rounded bg-sky-100/70 focus:outline-none focus:bg-hover-input min-h-[150px] max-lg:max-h-[40dvh] p-2 mb-2 text-main text-justify placeholder:text-gray resize-none overflow-y-auto scrollbar-hide shadow-sm"
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          {mode === "editTodo" ? (
            <div className="flex max-sm:flex-col">
              <p className=" flex mr-3 max-sm:mb-2">Change task deadline:</p>
              <DatePicker
                selected={endDay}
                onChange={(date) => setEndDay(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy HH:mm"
                showTimeInput
                className="w-[200px] text-center border border-sky-300 bg-input-light rounded focus:outline-none focus:bg-hover-input shadow-md"
              />
            </div>
          ) : (
            <div className="flex  mt-3 max-sm:flex-row">
              <p className="mr-3 ">Deadline:</p>
              <DatePicker
                selected={endDay}
                onChange={(date) => setEndDay(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy HH:mm"
                showTimeInput
                className="w-full max-lg:[200px] text-center bg-input-light border border-sky-300 rounded focus:outline-none focus:bg-hover-input shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex mt-3 justify-between items-center">
          {mode === "editTodo" ? (
            <div className="flex ">
              <Button
                onClick={handelTodoSubmit}
                variant={"default"}
                size={"small"}
                className="mr-7  shadow-md"
              >
                Update
              </Button>
            </div>
          ) : (
            <Button
              onClick={handelTodoSubmit}
              variant={"default"}
              size={"small"}
              className=" shadow-md "
            >
              Add Task
            </Button>
          )}

          {mode === "editTodo" && (
            <div className="flex gap-3">
              <TooltipDesktop content="Delete task">
                <button
                  className="hover:animate-pulse"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedItem?._id) return;
                    handeDeleteTodo(selectedItem._id, true);
                    onClose();
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </TooltipDesktop>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </ModalWrapper>
  );
};
