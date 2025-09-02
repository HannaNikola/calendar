import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteTodoApi, updateTodotApi } from "../api/todoApi";
import { closeElementModal } from "../store/sharedComponent/modalReducer";
import { CalendarTodo } from "../types/typesTodoApi";

export const useTodoHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos } = useSelector((state: RootState) => state.todo);
  const { selectedId, type } = useSelector((state: RootState) => state.modal);
const selectedItem = useSelector((state: RootState) =>
  state.todo.todos.find(todo => todo._id === selectedId)
);

  const handelUpdateTodo = async (
    todoId: string,
    updatedFields: Partial<CalendarTodo>
  ) => {
    if (!todoId) return;

    await dispatch(updateTodotApi({ id: todoId, todoData: updatedFields }));
    dispatch(closeElementModal());
  };

  const handeDeleteTodo = (todoId: string, closeModal = false) => {
    dispatch(deleteTodoApi(todoId));

    if (closeModal && type === "todo") {
      dispatch(closeElementModal());
    }
  };

  return {
    handeDeleteTodo,
    handelUpdateTodo,
  };
};

