import { PropsWithChildren } from "react";


interface IProps {
    className?: string
}
export function PageWrapper({children, className} : PropsWithChildren<IProps>){
return (
    <div className={`flex m-auto flex-col lg:flex-row px-5 py-10  ${className || ""}`}>
    {children}
  </div>

)

}