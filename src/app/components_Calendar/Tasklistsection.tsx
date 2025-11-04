import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useTodoExpired } from "../hooks/useTodoExpired";
import { toDate } from "../utils/date";
import { TooltipDesktop } from "../shared/ui/Tooltip";
import { favoriteTodoApi } from "../api/todoApi";
import { Star } from "lucide-react";
import { useState } from "react";

export const Tasklistsection = () => {
  const [expandedId, setexpandedId] = useState<string | null>(null);
  const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  const activeTodos = todos.filter((item) => !item.isCompletedTask);

  const toggleExpand = (id: string) => {
    setexpandedId(expandedId === id ? null : id);
  };

  return (
    <div className=" flex p-2 w-[260px] flex-col bg-sky-light-background rounded-2xl">
      <h2 className="mb-4 text-center text-medium ">Your active task list</h2>
      <ul>
        {activeTodos.map((item) => {
          const isExpanded = expandedId === item._id;
          return (
            <li
              key={item._id}
              className={`
    w-64  rounded-lg border p-2 mb-2 overflow-hidden cursor-pointer
    transition-all duration-300
    ${isExpanded ? "max-h-80" : "max-h-24"}
  `}
              onClick={() => toggleExpand(item._id)}
            >
              <div className="flex flex-row justify-between">
                <p className="text-sky-dark text-medium weight-extra mb-2">
                  {item.title}
                </p>
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
                    className="hover:animate-pulse flex"
                  >
                    <Star
                      size={20}
                      className={
                        item.isImportant ? "fill-amber-300" : "stroke-black"
                      }
                    />
                  </button>
                </TooltipDesktop>
              </div>
              <p
              //    className="text-small line-clamp-1 mb-1"
              >
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
