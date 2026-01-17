import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "admin" | "game"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant = "admin", ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    variant === "admin" &&
                    "h-10 rounded-md border border-slate-200 bg-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
                    variant === "game" &&
                    "h-12 rounded-lg border-2 border-yellow-700 bg-stone-800 text-amber-100 placeholder:text-stone-500 font-serif focus-visible:border-amber-500 focus-visible:ring-0 shadow-inner",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
