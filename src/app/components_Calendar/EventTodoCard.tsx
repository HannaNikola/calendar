import { useEffect, useRef, useState } from "react";
import { CalendarTodo } from "../types/typesTodoApi";
import { Circle, CircleCheckBig, Star, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { completedTodoApi, favoriteTodoApi } from "../api/todoApi";
import DatePicker from "react-datepicker";
import { toast } from "sonner";
import { useTodoExpired } from "../hooks/useTodoExpired";

interface EventTodoCardProps {
  todo: CalendarTodo;
  isSaved: boolean;
  canRestore: boolean;
  onChange: (id: string, fields: Partial<CalendarTodo>) => void;
  onRemove: (id: string) => void;
}

export const EventTodoCard = ({
  todo,
  isSaved,
  canRestore,
  onChange,
  onRemove,
}: EventTodoCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handeDeleteTodo } = useTodoHandlers();
  const titleTaskRef = useRef<HTMLTextAreaElement | null>(null);
  const desRef = useRef<HTMLTextAreaElement | null>(null);
  const { mode } = useSelector((state: RootState) => state.modal);
  const isNew = mode === "new";
  const [localCompleted, setLocalCompleted] = useState(
    todo.isCompletedTask ?? false,
  );

  const expired = !localCompleted && useTodoExpired(todo.end ?? null);

  useEffect(() => {
    setLocalCompleted(todo.isCompletedTask ?? false);
  }, [todo._id, todo.isCompletedTask]);

  useEffect(() => {
    const adjustHeight = (el: HTMLTextAreaElement | null) => {
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    adjustHeight(titleTaskRef.current);
    adjustHeight(desRef.current);
  }, [todo.title, todo.description]);

  const handleImportant = () => {
    const nextImportant = !todo.isImportant;

    onChange(todo._id, { isImportant: nextImportant });

    if (isSaved) {
      dispatch(
        favoriteTodoApi({
          id: todo._id,
          isImportant: nextImportant,
        }),
      );
    }
  };

  const handleCompleted = () => {
    const nextCompleted = !localCompleted;

    if (!nextCompleted && !canRestore) {
      toast.error("An event can have a maximum of 3 active tasks");
      return;
    }

    setLocalCompleted(nextCompleted);

    onChange(todo._id, {
      isCompletedTask: nextCompleted,
    });

    if (isSaved) {
      dispatch(
        completedTodoApi({
          id: todo._id,
          isCompletedTask: nextCompleted,
        }),
      );
    }
  };

  return (
    <div className="flex w-full mb-3 border border-sky-300 p-2 rounded bg-sky-50/90 shadow-sm">
      <div className="w-full flex-col mr-2">
        <div className="flex">
          <textarea
            ref={titleTaskRef}
            value={todo.title}
            maxLength={70}
            placeholder="Task title"
            rows={1}
            onChange={(e) => onChange(todo._id, { title: e.target.value })}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            className="w-full border border-sky-300 rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mr-2 mb-2 text-main text-justify resize-none overflow-hidden min-h-[15px] shadow-md"
          />

          <button
            type="button"
            className="hover:animate-pulse"
            onClick={handleImportant}
          >
            <Star
              size={20}
              className={todo.isImportant ? "fill-amber-300" : "stroke-black"}
            />
          </button>
          {isNew || (
            <button
              type="button"
              className="hover:animate-pulse ml-2"
              onClick={handleCompleted}
            >
              {localCompleted ? (
                <CircleCheckBig size={20} />
              ) : (
                <Circle size={20} />
              )}
            </button>
          )}
        </div>

        <textarea
          ref={desRef}
          placeholder="Type your description maximum 600 characters ..."
          value={todo.description ?? ""}
          maxLength={600}
          onChange={(e) => onChange(todo._id, { description: e.target.value })}
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          className="w-full border border-sky-300 rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main text-justify placeholder:text-gray resize-none overflow-hidden min-h-[40px] shadow-md"
        />

        <div className="flex">
          <p className="mr-2">Deadline</p>
          <DatePicker
            selected={todo.end ? new Date(todo.end) : null}
            onChange={(date) => onChange(todo._id, { end: date })}
            timeInputLabel="Time:"
            dateFormat="dd-MM-yyyy HH:mm"
            showTimeInput
            className={`w-full text-center border rounded shadow-md focus:outline-none ${
              expired
                ? "border-red-500 text-red-600 bg-red-50"
                : "bg-input-light border-sky-300 focus:bg-hover-input"
            }`}
          />
          <button
            className="flex ml-auto hover:animate-pulse"
            onClick={(e) => {
              e.stopPropagation();

              if (!todo._id) return;

              handeDeleteTodo(todo._id, true);
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
