import { PropsWithChildren } from "react";


interface IProps {
    className?: string
}
export function PageWrapper({children, className} : PropsWithChildren<IProps>){
return (
    <div className={`flex  min-w-[375px] flex-col lg:flex-row px-5 py-10  ${className || ""}`}>
    {children}
  </div>

)

}