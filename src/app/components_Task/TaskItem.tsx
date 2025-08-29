
import { useDispatch} from "react-redux";
import { favoriteTodoApi} from "../api/todoApi";
import { AppDispatch} from "../store/store";
import { BellRing, CircleCheckBig, Star, Trash2 } from "lucide-react";
import { Button } from "../shared/ui/Button";

import {
  openElementModal,
} from "../store/sharedComponent/modalReducer";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { CalendarTodo } from "../types/typesTodoApi";


export const TaskItem = ({ item }: { item: CalendarTodo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handeDeleteTodo } = useTodoHandlers();

  return (
    <li
      onClick={() =>
        dispatch(openElementModal({ type: "todo", selectedItem: item }))
      }
      className="flex w-full justify-between mb-2 border rounded-md border-grey-border px-3 py-3"
    >
      <div className="flex w-full flex-col mr-3 ">
        <p className="text-sky-dark">{item.title}</p>
        <p className="text-small mb-3">{item.description}</p>
        <div className="flex items-end mt-auto">
          <Button variant="default" size="small" className="mr-3 text-small">
            Update
          </Button>
          <button>
            <BellRing size={20} />
          </button>
        </div>
      </div>

      <div className="flex max-lg:flex-col gap-3">
        <button
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
        >
          <Star
            size={20}
            className={item.isImportant ? "fill-amber-300" : "stroke-black"}
          />
        </button>
        <button>
          <CircleCheckBig size={20} />
        </button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (item._id) {
              handeDeleteTodo(item._id);
            }
          }}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </li>
  );
};
