import { type VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../utils/cn'
 
 

 const variantsButton = cva(
  'inline-flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        default: ' text-sky-dark hover:text-sky-hover-medium border rounded rounded-2xl border-sky-dark-border hover:border-sky-hover-medium',
        outline: '',
        alert: 'text-alert-text hover:text-alert-hover border rounded rounded-2xl border-alert-border hover:border-alert-hover'
      },
      size: {
        default: 'w-[90px] px-4 py-1 ',
        small: '',
        medium: '',
        large: '',
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






