"use client"
import { useScreenType } from "@/app/hooks/useScreenType"
import { options } from "@fullcalendar/core/preact.js"
import React, { useEffect, useRef } from "react"
import tippy, { Instance, Props } from "tippy.js"
import "tippy.js/dist/tippy.css"



interface TooltiDesktoppProps {
  content?: string
  children: React.ReactElement
  options?: Partial<Props>
}

export const TooltipDesktop = ({content, children, options}: TooltiDesktoppProps)=>{
// const ref = useRef<HTMLElement | null>(null)
const ref = useRef<HTMLSpanElement | null>(null)
const screenType = useScreenType()

useEffect(()=>{
  if(screenType !== 'desktop' || !ref.current || !content) return
  const instance: Instance = tippy(ref.current,{
    content,
    arrow: false,
    theme: 'gray',
    animation: 'fade',
    appendTo: () => document.body,
    allowHTML: true,
    ...options
  })
  return ()=> instance.destroy()
},[screenType, content, options])
  return <span ref={ref}>{children}</span>
}








