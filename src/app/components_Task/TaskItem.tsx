import { useDispatch, useSelector } from "react-redux";
import { completedTodoApi, favoriteTodoApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { Circle, CircleCheckBig, Star, Trash2 } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { openElementModal } from "../store/sharedComponent/modalReducer";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { CalendarTodo } from "../types/typesTodoApi";
import { useTodoExpired } from "../hooks/useTodoExpired";
import { toDate } from "../utils/date";
import { useState } from "react";
import "tippy.js/dist/tippy.css";
import { useScreenType } from "../hooks/useScreenType";
import { TooltipDesktop } from "../shared/ui/Tooltip";


export const TaskItem = ({ item }: { item: CalendarTodo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handeDeleteTodo } = useTodoHandlers();
  const { data} = useSelector((state: RootState) => state.modal);
  const expired = useTodoExpired(item.end ?? null);
  const colorBorder = expired
    ? "border-red-400 bg-red-50"
    : item.isImportant
      ? "border-amber-300 bg-amber-50"
      : "border-grey-border bg-sky-50 ";

  const formattedEnd = item.end ? toDate(item.end)?.toLocaleDateString() : "—";
  const [localCompleted, setLocalCompleted] = useState(item.isCompleted);
  const screenType = useScreenType();

  return (
    <li
      onClick={() =>
        dispatch(openElementModal({ type: "todo", data:{selectedId: item._id} }))
      }
      className={`flex w-full justify-between mb-2 border rounded-md px-3 py-3 ${colorBorder}`}
    >
      <div className="flex w-full flex-col mr-3 ">
        <p className="text-sky-dark text-medium weight-extra">{item.title}</p>

        <TooltipDesktop content={item.description}>
          <p className="text-small line-clamp-1 mb-3">{item.description}</p>
        </TooltipDesktop>

        <p
          className={`mb-2 text-small text-alert-text ${expired ? "text-red-500 " : "text-green-700"}`}
        >
          Deadline:{formattedEnd}
        </p>
        <div className="flex items-end mt-auto">
          <Button variant="default" size="small" className="mr-3 text-small">
            Update
          </Button>
        </div>
      </div>

      <div className="flex flex-col place-content-between gap-3">
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
                })
              );
            }}
            className="hover:animate-pulse"
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
            className="hover:animate-pulse"
            onClick={(e) => {
              e.stopPropagation();
              setLocalCompleted(true);

              setTimeout(() => {
                if (item._id) {
                  dispatch(
                    completedTodoApi({
                      id: item._id,
                      isCompleted: !item.isCompleted,
                    })
                  );
                }
              }, 500);
            }}
          >
            {localCompleted ? <CircleCheckBig size={20} /> : <Circle />}
          </button>
        </TooltipDesktop>
        <TooltipDesktop content="Delite task">
          <button
            type="button"
            className="hover:animate-pulse"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              if (item._id) {
                handeDeleteTodo(item._id);
              }
            }}
          >
            <Trash2 size={20} />
          </button>
        </TooltipDesktop>
      </div>
    </li>
  );
};
