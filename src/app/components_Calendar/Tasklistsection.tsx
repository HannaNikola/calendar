import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { TooltipDesktop } from "../shared/ui/Tooltip";
import { completedTodoApi, favoriteTodoApi } from "../api/todoApi";
import { Circle, CircleCheckBig, Star } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";

export const Tasklistsection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [expandedId, setexpandedId] = useState<string | null>(null);
  const { todos } = useSelector((state: RootState) => state.todo);
  const [completedId, setCompletedId] = useState<string | null>(null);

  const activeTodos = todos.filter(
    (item) => !item.isCompletedTask && !item.isOverdue
  );

  const toggleExpand = (id: string) => {
    setexpandedId(expandedId === id ? null : id);
  };

  return (
    <div className=" flex w-full p-2 min-w-[260px] flex-col bg-sky-light-background rounded-2xl">
      <h2 className="mb-4 text-center text-medium ">Your active task list</h2>
      <ul className="flex  w-full flex-col">
        {activeTodos.map((item) => {
          const isExpanded = expandedId === item._id;
          return (
            <li
              key={item._id}
              className={`
     w-full flex flex-row place-content-between  rounded-lg border p-2 mb-2 overflow-hidden cursor-pointer
    transition-all duration-300
    ${isExpanded ? "max-h-[370px]" : "max-h-24"}
  `}
              onClick={() => toggleExpand(item._id)}
            >
              <div className="flex-col">
                <p className="text-sky-dark text-medium weight-extra mb-2">
                  {item.title}
                </p>
                <p className="mb-2">{item.description}</p>
                <p className="mb-2 text-small text-green-700">
                  Deadline:
                  {item.end ? dayjs(item.end).format("DD/MM/YYYY HH:mm") : "—"}
                </p>
              </div>
              <div className="flex flex-col">
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
                    className="hover:animate-pulse flex mb-3"
                  >
                    <Star
                      size={20}
                      className={
                        item.isImportant ? "fill-amber-300" : "stroke-black"
                      }
                    />
                  </button>
                </TooltipDesktop>

                <TooltipDesktop content="Complete task">
                  <button
                    type="button"
                    className="hover:animate-pulse"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompletedId(item._id);

                      setTimeout(() => {
                        dispatch(
                          completedTodoApi({
                            id: item._id,
                            isCompletedTask: !item.isCompletedTask,
                          })
                        );
                        setCompletedId(null);
                      }, 500);
                    }}
                  >
                    {completedId === item._id ? (
                      <CircleCheckBig size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>
                </TooltipDesktop>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
