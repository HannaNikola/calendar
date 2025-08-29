'use client'
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import {TaskItem } from "./TaskItem"

export const TodoImportant = ()=>{
    const {todos} = useSelector((state:RootState)=> state.todo)
    const isImportantTodo = todos.filter((item)=> item.isImportant)
    return(
        <div className="w-full">
            <ul>
      {isImportantTodo.length === 0 ? (
        <li>Empty...</li>
      ) : (
        isImportantTodo.map((item) => (
          <TaskItem key={item._id} item={item}></TaskItem >
        ))
      )}
    </ul>
        </div>
    )
}