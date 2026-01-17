import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "admin" | "game"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "admin", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variant === "admin" &&
                    "h-10 px-4 py-2 rounded-md bg-admin-primary text-slate-50 hover:bg-admin-primary/90 shadow-sm",
                    variant === "game" &&
                    "h-14 px-8 py-4 rounded-xl font-serif text-lg border-2 border-yellow-600 bg-game-primary text-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]",
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
