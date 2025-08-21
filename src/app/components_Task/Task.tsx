"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { CircleCheckBig, Star, Trash2 } from "lucide-react";
import { Button } from "../shared/ui/Button";

export const TaskEl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos} = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodosApi());
  }, [dispatch]);

  return (
    <div className="flex w-full flex-col ">
      <ul className="flex  w-full flex-col  ">
        {todos.length === 0 ? (
          <li>Dont have any task yet</li>
        ) : (
          todos.map((item) => (
            <li
              key={item._id}
              className="flex  w-full  justify-between mb-2 border rounded-md border-grey-border px-3 py-3 "
            >
              <div className="flex w-full flex-col mr-3 ">
                {item.title}
                <p>{item.description}</p>
                <div className="flex mt-3">
                  <Button variant={'default'} size={'small'} className="mr-3">Update</Button>
                  <Button variant={'default'} size={'small'}>Remind</Button>
                </div>
              </div>

              <div className="flex max-lg:flex-col gap-3">
                <button>
                  <Star size={20} />
                </button>
                <button>
                  <CircleCheckBig size={20} />
                </button>
                <button>
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
