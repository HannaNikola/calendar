import { type VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../utils/cn'
 
 

 const variantsButton = cva(
  'inline-flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        default: ' text-black hover:bg-navbar-button-hover bg-navbar-button   rounded-2xl border-sky-dark-border hover:border-sky-hover-medium shadow-lg',
        transper: 'text-black text-main text-sm whitespace-nowrap',
        alert: 'text-alert-text hover:bg-alert-button-hover bg-alert-button  rounded-2xl border-alert-border hover:border-alert-hover shadow-lg',
        rounded:' text-white text-h2 hover:text-black  rounded-lg border-transparent bg-grey-button  hover:bg-gray-hover shadow-lg transition-colors duration-300',
      },
      size: {
        default: 'w-[90px] px-4 py-1 ',
        small: 'w-full flex-1 px-2 py-2 h-[40px]',
        medium: '',
        large: 'w-[260px] px-4 py-5 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)



export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variantsButton> {}


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
       ref={ref} {...props} 
       className={cn(variantsButton({variant, size}), className)}
       {...props}
       />
    )
  }
)

Button.displayName = 'Button'






