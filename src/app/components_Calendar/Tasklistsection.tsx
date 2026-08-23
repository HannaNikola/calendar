import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "../shared/ui/Button";
import { TaskItem } from "../components_Task/TaskItem";
import { ModalTodo } from "../components_Task/ModalTodo";
import { closeElementModal } from "../store/sharedComponent/modalReducer";

export const Tasklistsection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);
  const { todos } = useSelector((state: RootState) => state.todo);
  const [showToday, setShowToday] = useState(false);

  const activeTodos = todos
    .filter((item) => !item.isCompletedTask && !item.isOverdue)
    .sort((a, b) => {
      return Number(b.isImportant) - Number(a.isImportant);
    });
  const todayStart = dayjs().startOf("day");
  const todayEnd = dayjs().endOf("day");

  const todayTodos = todos
    .filter((item) => {
      if (item.isCompletedTask) return false;

      const start = item.start ? dayjs(item.start) : null;
      const end = item.end ? dayjs(item.end) : start;

      if (!start || !end) return false;

      return start.isBefore(todayEnd) && end.isAfter(todayStart);
    })
    .sort((a, b) => {
      if (!a.start || !b.start) return 0;
      return dayjs(a.start).diff(dayjs(b.start));
    });
  const visibleTodos = showToday ? todayTodos : activeTodos;
  return (
    <>
      <div className=" flex w-[200px] p-2 min-w-[260px] flex-col bg-sky-light-background rounded-2xl">
        <h2 className="mb-4 text-center text-medium ">Your active task list</h2>
        <div className="flex gap-2 justify-center">
          <Button
            variant={"transper"}
            size={"default"}
            className={`font-medium mb-3 mt-3 ${showToday ? "bg-sky-200 rounded-lg" : ""}`}
            onClick={() => setShowToday(true)}
          >
            Today
          </Button>
          <Button
            variant={"transper"}
            size={"default"}
            className={`font-medium mb-3 mt-3 ${!showToday ? "bg-sky-200 rounded-lg" : ""}`}
            onClick={() => setShowToday(false)}
          >
            All Task
          </Button>
        </div>

        <ul className="flex  w-full flex-col">
          {visibleTodos.map((item) => {
            return <TaskItem key={item._id} item={item} />;
          })}
        </ul>
      </div>

      {type === "todo" && (
        <ModalTodo
          isOpen={isOpen}
          onClose={() => dispatch(closeElementModal())}
        />
      )}
    </>
  );
};
