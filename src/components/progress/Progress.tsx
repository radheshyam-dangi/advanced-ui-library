import * as React from "react"
import { cn } from "../../lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress numerical point value ranging 0 to 100 */
  value?: number
  /** Color palette variant track type */
  variant?: "default" | "success" | "warning" | "destructive"
  /** Thickness layer size metric scale */
  size?: "sm" | "md" | "lg"
  /** Appends a clean moving stripe element filter overlay */
  isAnimated?: boolean
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      variant = "default",
      size = "md",
      isAnimated = false,
      ...rest
    },
    ref
  ) => {
    // Clamp values safely inside logical boundaries
    const clampedValue = Math.min(Math.max(0, value), 100)

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "w-full overflow-hidden bg-zinc-100 rounded-full",
          
          // Track heights
          size === "sm" && "h-1.5",
          size === "md" && "h-3",
          size === "lg" && "h-5",

          className
        )}
        {...rest}
      >
        <div
          style={{ width: `${clampedValue}%` }}
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            
            // Color states
            variant === "default" && "bg-[#aa3bff]",
            variant === "success" && "bg-green-500",
            variant === "warning" && "bg-amber-500",
            variant === "destructive" && "bg-red-500",

            // Animation pattern
            isAnimated && "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]"
          )}
        />
      </div>
    )
  }
)

Progress.displayName = "Progress"