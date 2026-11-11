import { useDispatch } from "react-redux";
import { completedTodoApi, favoriteTodoApi } from "../api/todoApi";
import { AppDispatch } from "../store/store";
import {
  Circle,
  CircleCheckBig,
  Star,
  Trash2,
  PencilLine,
  AlarmClock,
} from "lucide-react";
import { Button } from "../shared/ui/Button";
import { openElementModal } from "../store/sharedComponent/modalReducer";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { CalendarTodo } from "../types/typesTodoApi";
import { useTodoExpired } from "../hooks/useTodoExpired";
import { useState } from "react";
import { TooltipDesktop } from "../shared/ui/Tooltip";
import dayjs from "dayjs";
import { useScreenType } from "../hooks/useScreenType";

export const TaskItem = ({
  item,
  className,
}: {
  item: CalendarTodo;
  className?: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handeDeleteTodo } = useTodoHandlers();
  const expired = useTodoExpired(item.end ?? null);

  const screenType = useScreenType();
  const isMobile = screenType === "mobail";

  const colorBorder = item.isCompletedTask
    ? "border-l-gray-400 bg-gray-200"
    : expired
      ? "border-l-red-400 bg-red-50"
      : item.isImportant
        ? "border-l-amber-400 bg-amber-50"
        : "border-l-sky-400 bg-sky-50";

  const formattedEnd = item.end
    ? dayjs(item.end).format("DD/MM/YYYY HH:mm")
    : "—";

  const [localCompleted, setLocalCompleted] = useState(item.isCompletedTask);

  const handleOpen = () => {
    dispatch(
      openElementModal({
        type: "todo",
        mode: "editTodo",
        data: { selectedId: item._id },
      }),
    );
  };

  return (
    <li
      onClick={handleOpen}
      className={`
        @container
        box-border min-w-0 w-full mb-3
        border border-transparent border-l-4
        ${colorBorder}
        rounded-lg shadow-md
        transition-all duration-200
        cursor-pointer

        flex items-start gap-3 px-3 py-3

        @md:grid @md:items-center
        @md:grid-cols-[minmax(0,1fr)_minmax(190px,auto)_auto]
        @md:gap-3 @md:px-3

        @lg:grid-cols-[minmax(0,1.5fr)_minmax(190px,auto)_auto]
        @lg:gap-4 @lg:px-4

        ${className ?? ""}
      `}
    >
      <div className="min-w-0 w-full">
        <p className="min-w-0 truncate text-sky-dark text-medium weight-extra">
          {item.title}
        </p>

        <p className="min-w-0 text-small line-clamp-1 break-words">
          {item.description}
        </p>

        
        <div className="mt-2 flex items-center  gap-2 @md:hidden">
          <AlarmClock
            size={16}
            className={`shrink-0 ${
              expired ? "text-red-500" : "text-green-700"
            }`}
          />

          <p
            className={`min-w-0 whitespace-nowrap text-small ${
              expired ? "text-red-500" : "text-green-700"
            }`}
          >
            Deadline: {formattedEnd}
          </p>
        </div>

        
        <div className="mt-3 flex justify-start @md:hidden">
          <Button variant="default" size="small" className="text-small">
            Update
          </Button>
        </div>
      </div>

      {/* Deadline на Tablet / Desktop */}
      <div className="hidden min-w-0 items-center mr-20 gap-2 @md:flex">
        <AlarmClock
          size={18}
          className={`shrink-0 ${expired ? "text-red-500" : "text-green-700"}`}
        />

        <p
          className={`shrink-0 whitespace-nowrap text-small ${
            expired ? "text-red-500" : "text-green-700"
          }`}
        >
          {formattedEnd}
        </p>
      </div>

      
      <div
        className="
          flex shrink-0 flex-col
          items-center justify-between gap-3
          @md:flex-row @md:items-center @md:gap-2
          @lg:gap-3
        "
      >
        <TooltipDesktop content="Favorite">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!item._id) return;

              dispatch(
                favoriteTodoApi({
                  id: item._id,
                  isImportant: !item.isImportant,
                }),
              );
            }}
            className="shrink-0 hover:animate-pulse"
          >
            <Star
              size={20}
              className={item.isImportant ? "fill-amber-300" : "stroke-black"}
            />
          </button>
        </TooltipDesktop>

        <TooltipDesktop content="Complete task">
          <button
            type="button"
            className="shrink-0 hover:animate-pulse"
            onClick={(e) => {
              e.stopPropagation();
              setLocalCompleted(!item.isCompletedTask);

              setTimeout(() => {
                if (item._id) {
                  dispatch(
                    completedTodoApi({
                      id: item._id,
                      isCompletedTask: !item.isCompletedTask,
                    }),
                  );
                }
              }, 500);
            }}
          >
            {localCompleted ? (
              <CircleCheckBig size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>
        </TooltipDesktop>

        <TooltipDesktop content="Delete task">
          <button
            type="button"
            className="shrink-0 hover:animate-pulse"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              if (item._id) handeDeleteTodo(item._id);
            }}
          >
            <Trash2 size={20} />
          </button>
        </TooltipDesktop>
        <div className="hidden @md:block">
          <TooltipDesktop content="Edit task">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className="shrink-0 hover:animate-pulse"
            >
              <PencilLine size={20} />
            </button>
          </TooltipDesktop>
        </div>
      </div>
    </li>
  );
};
