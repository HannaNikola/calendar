import { PropsWithChildren } from "react";


interface IProps {
    className?: string
}
export function PageWrapper({children, className} : PropsWithChildren<IProps>){
return (
    <div className={`flex px-5 my-10 ${className || ""}`}>
    {children}
  </div>

)

}