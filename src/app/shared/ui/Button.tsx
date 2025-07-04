import { type VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../utils/cn'
 
 

 const variantsButton = cva(
  'inline-flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        default: ' text-sky-dark hover:text-sky-hover-medium   rounded-2xl border-sky-dark-border hover:border-sky-hover-medium',
        outline: '',
        alert: 'text-alert-text hover:text-alert-hover  rounded-2xl border-alert-border hover:border-alert-hover',
        rounded:' text-white text-h2 hover:text-black  rounded-lg border-transparent bg-grey-button  hover:bg-gray-hover shadow-lg',
      },
      size: {
        default: 'w-[90px] px-4 py-1 ',
        small: '',
        medium: '',
        large: 'w-[260px] px-7 py-6 ',
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






