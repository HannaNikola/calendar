import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteTodoApi, updateTodotApi } from "../api/todoApi";
import { CalendarTodo } from "../types/typesTodoApi";

export const useTodoHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { type } = useSelector((state: RootState) => state.modal);

  const handelUpdateTodo = async (
    todoId: string,
    updatedFields: Partial<CalendarTodo>,
  ) => {
    
    await dispatch(updateTodotApi({ id: todoId, todoData: updatedFields })).unwrap();;
    
  };

  const handeDeleteTodo = (todoId: string, closeModal = false) => {
    dispatch(deleteTodoApi(todoId)).unwrap();
  };

  return {
    handeDeleteTodo,
    handelUpdateTodo,
  };
};
