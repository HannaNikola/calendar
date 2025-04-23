"use client";

import { Field, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {EventModalProps} from "@/app/types/typesModal"
import { X } from 'lucide-react';





const EventSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "short")
    .max(30, "long")
    .required("title can`t be empty"),
});

export const EventModal = ({
  isOpen,
  onClose,
  onSubmit,
  slotStart,
  slotEnd,
}: EventModalProps) => {
  if (!isOpen) return null;

  

  return (
    <div className=" flex fixed inset-0 bg-black/50  items-center justify-center z-50 shadow-2xs">
      
     
      <div className=" p-4 rounded-lg min-w-[400px] bg-white">
        <div className="flex ">
        <h1 className="flex-1 text-center  text-black mb-6">
          Create new event
        </h1>
        <button className='flex' onClick={onClose}> <X size={15}/></button>
        </div>
        
        <Formik
  initialValues={{ title: "", allDay: false, addTask: false }}
  validationSchema={EventSchema}
  onSubmit={(
    values,
    { resetForm }: FormikHelpers<{ title: string; allDay: boolean; addTask: boolean }>
  ) => {
    onSubmit({
      title: values.title,
      start: slotStart,  
      end: slotEnd,      
      allDay: values.allDay,
      addTask: values.addTask,
    });
    resetForm();
    onClose();
  }}
>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col ">
        <Field
          as="textarea"
          name="title"
          rows={1}
          className="border-none rounded bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 mb-3 text-black placeholder:text-gray resize-none overflow-hidden min-h-[40px]"
          placeholder="type your event"
          onInput={(e: any) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        <div className="flex justify-between mb-8 ">
          <div className="flex items-center">
            <label className="flex text-black mr-2">All day event</label>
            <Field type="checkbox" name="allDay" />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Add Task</label>
            <Field type="checkbox" name="addTask" />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <button 
         
         type='button'  className="w-[50px] text-red-700" >
          Delete
        </button>
        <button className="w-[50px] text-sky-950" type="submit">
          Update
        </button>
        <button className="w-[50px] text-sky-950" type="submit">
          Save
        </button>
      </div>
    </form>
  )}
</Formik>
      </div>
    </div>
  );
};
