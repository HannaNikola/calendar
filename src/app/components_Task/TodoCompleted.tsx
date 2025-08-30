'use client'
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"
import { TaskItem } from "./TaskItem"

export const TodoCompleted = ()=>{
    const {todos, status} = useSelector((state:RootState)=> state.todo)
    const isCompletedTodo = todos.filter((item)=> item.isCompleted)
    const [showLoader, setShowLoader] = useState(false);
    
   
 useEffect(() => {
    if (status === "loading") {
      const timeout = setTimeout(() => setShowLoader(true), 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowLoader(false);
    }
  }, [status]);


   
    return (
        <div className="w-full">
            {showLoader ? (
                <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
            ):(
                <ul>
                    {isCompletedTodo.map((item)=>(
                    <TaskItem key={item._id} item={item}/>))}
                </ul>
                
            )}

        </div>
    )
}