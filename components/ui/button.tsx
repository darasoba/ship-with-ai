import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium rounded-full transition-[background-color,transform,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]'

    const variants = {
      primary: 'bg-foreground text-background hover:opacity-90 border border-foreground',
      secondary:
        'bg-surface text-foreground hover:bg-surface-raised border border-border',
      ghost: 'text-foreground-secondary hover:text-foreground',
    }

    const sizes = {
      sm: 'px-4 py-1 text-[13px]',
      md: 'px-6 py-2 text-sm',
      lg: 'px-8 py-2.5 text-[15px]',
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
