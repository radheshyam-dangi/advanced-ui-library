import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "glass"
  /** Button size */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /** Stretch to fill parent container */
  fullWidth?: boolean
  /** Corner rounding scale */
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  /** Drop shadow depth */
  elevation?: "none" | "sm" | "md" | "lg"
  /** Show loading spinner */
  isLoading?: boolean
  /** Text shown while loading */
  loadingText?: string
  /** Hover / idle animation */
  animation?: "none" | "pulse" | "bounce" | "scaleUp" | "shake"
  /** Trigger device haptic feedback on click */
  hapticFeedback?: boolean
  /** Render as child element (Radix Slot) */
  asChild?: boolean
  /** Icon placed before label */
  leftIcon?: React.ReactNode
  /** Icon placed after label */
  rightIcon?: React.ReactNode
  /** Gap between icon and label */
  iconGap?: "xs" | "sm" | "md" | "lg"
  /** Floating notification badge */
  badgeCount?: number
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      fullWidth = false,
      rounded = "md",
      elevation = "none",
      isLoading = false,
      loadingText,
      animation = "none",
      hapticFeedback = false,
      asChild = false,
      leftIcon,
      rightIcon,
      iconGap = "sm",
      badgeCount,
      children,
      onClick,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Determine the baseline tag layout layer safely
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || disabled) {
        e.preventDefault()
        return
      }
      if (hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(10)
      }
      onClick?.(e)
    }

    // Compute styles independently so they merge onto the Radix Slot perfectly
    const runtimeStyles = cn(
      // Base
      "inline-flex items-center justify-center font-semibold transition-all duration-200",
      "outline-none select-none relative overflow-hidden",
      fullWidth ? "w-full flex" : "w-auto",
      isLoading || disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer active:scale-[0.97]",

      // Variants
      variant === "default" && "bg-[#aa3bff] text-white hover:bg-[#912ee6] border border-transparent",
      variant === "outline" && "border border-[#e5e4e7] bg-white text-[#08060d] hover:bg-zinc-50",
      variant === "secondary" && "bg-[#f4f3ec] text-[#08060d] hover:bg-[#e5e4e7] border border-transparent",
      variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 border border-transparent",
      variant === "ghost" && "bg-transparent text-[#08060d] hover:bg-[#f4f3ec] border border-transparent",
      variant === "glass" && "bg-white/30 backdrop-blur-md border border-white/20 text-[#08060d]",

      // Sizes
      size === "xs" && "h-7 px-2 text-xs",
      size === "sm" && "h-8 px-3 text-xs",
      size === "default" && "h-10 px-4 text-sm",
      size === "lg" && "h-12 px-6 text-base",
      size === "xl" && "h-14 px-8 text-lg",

      // Rounding Scale
      rounded === "none" && "rounded-none",
      rounded === "sm" && "rounded-sm",
      rounded === "md" && "rounded-md",
      rounded === "lg" && "rounded-xl",
      rounded === "full" && "rounded-full",

      // Elevation Shadows
      elevation === "sm" && "shadow-sm",
      elevation === "md" && "shadow-md",
      elevation === "lg" && "shadow-xl",

      // Micro-interactions / Animation profiles
      animation === "pulse" && "animate-pulse",
      animation === "bounce" && "hover:animate-bounce",
      animation === "scaleUp" && "hover:scale-105 active:scale-95",

      className
    )

    // Build standard layout components
    const innerContent = (
      <>
        {/* Loading spinner layout block */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}

        {/* Dynamic Label Layout Structure */}
        <span
          className={cn(
            "flex items-center justify-center",
            iconGap === "xs" && "gap-1",
            iconGap === "sm" && "gap-1.5",
            iconGap === "md" && "gap-2",
            iconGap === "lg" && "gap-3"
          )}
        >
          {!isLoading && leftIcon}
          <span>{isLoading && loadingText ? loadingText : children}</span>
          {!isLoading && rightIcon}
        </span>

        {/* Fixed Badge Layout Block - Sit safely alongside inner elements */}
        {badgeCount !== undefined && badgeCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 bg-red-500 text-white text-[10px]
              h-4 min-w-4 px-1 rounded-full flex items-center justify-center
              font-bold border border-white pointer-events-none"
          >
            {badgeCount > 10 ? "10+" : badgeCount}
          </span>
        )}
      </>
    )

    // If asChild is true, let Radix merge attributes directly onto a clean clone container
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: handleClick,
        "aria-busy": isLoading || undefined,
        "aria-label": badgeCount ? `${rest["aria-label"] ?? ""} (${badgeCount} notifications)` : rest["aria-label"],
        className: cn(runtimeStyles),
        ...rest,
        children: innerContent
      })
    }

    return (
      <Comp
        ref={ref}
        onClick={handleClick}
        disabled={isLoading || disabled}
        aria-busy={isLoading || undefined}
        aria-label={badgeCount ? `${rest["aria-label"] ?? ""} (${badgeCount} notifications)` : rest["aria-label"]}
        className={runtimeStyles}
        {...rest}
      >
        {innerContent}
      </Comp>
    )
  }
)

Button.displayName = "Button"
