import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // 1-5: Visual Design Controllers
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "glass"
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  fullWidth?: boolean
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  elevation?: "none" | "sm" | "md" | "lg"
  
  // 6-10: Interactivity & Feedback Controllers
  isLoading?: boolean
  loadingText?: string
  animation?: "none" | "pulse" | "bounce" | "scaleUp" | "shake"
  rippleColor?: string
  hapticFeedback?: boolean

  // 11-15: Technical Layout & Semantic Controllers
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconGap?: "xs" | "sm" | "md" | "lg"
  badgeCount?: number
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = "default",
    size = "default",
    fullWidth = false,
    rounded = "md",
    elevation = "none",
    isLoading = false,
    loadingText,
    animation = "none",
    leftIcon,
    rightIcon,
    iconGap = "sm",
    badgeCount,
    asChild = false,
    children,
    onClick,
    ...rest
  } = props

  const Comp = asChild ? Slot : "button"

  // Advanced Interactive Click Handler (Haptics simulation)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || rest.disabled) return
    if (props.hapticFeedback && navigator.vibrate) {
      navigator.vibrate(10)
    }
    if (onClick) onClick(e)
  }

  return (
    <Comp
      ref={ref}
      onClick={handleClick}
      disabled={isLoading || rest.disabled}
      className={cn(
        // Core Engine Base Styles
        "inline-flex items-center justify-center font-semibold transition-all duration-200 outline-none select-none relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]",
        
        // 1. Variant Processing Engine
        variant === "default" && "bg-[#aa3bff] text-white hover:bg-[#aa3bff]/90 border border-transparent",
        variant === "outline" && "border border-[#e5e4e7] bg-white text-[#08060d] hover:bg-zinc-50",
        variant === "secondary" && "bg-[#f4f3ec] text-[#08060d] hover:bg-[#e5e4e7] border border-transparent",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 border border-transparent",
        variant === "ghost" && "bg-transparent text-[#08060d] hover:bg-[#f4f3ec]",
        variant === "glass" && "bg-white/30 backdrop-blur-md border border-white/20 text-[#08060d]",

        // 2. Size Processing Engine
        size === "xs" && "h-7 px-2 text-xs",
        size === "sm" && "h-8 px-3 text-xs",
        size === "default" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        size === "xl" && "h-14 px-8 text-lg",

        // 3. Typography & Sizing Adjustments
        fullWidth ? "w-full flex" : "w-auto",

        // 4. Border Radius Processing Engine
        rounded === "none" && "rounded-none",
        rounded === "sm" && "rounded-sm",
        rounded === "md" && "rounded-md",
        rounded === "lg" && "rounded-xl",
        rounded === "full" && "rounded-full",

        // 5. Shadow Elevation Engine
        elevation === "none" && "shadow-none",
        elevation === "sm" && "shadow-sm",
        elevation === "md" && "shadow-md",
        elevation === "lg" && "shadow-xl",

        // 6. Micro-Animation Layer Engine
        animation === "pulse" && "animate-pulse",
        animation === "bounce" && "hover:animate-bounce",
        animation === "scaleUp" && "hover:scale-105 active:scale-95",
        animation === "shake" && "hover:animate-shake",

        className
      )}
      {...rest}
    >
      {/* Loading State Spinner Layout */}
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}

      {/* Structural Layout System */}
      <span className={cn(
        "flex items-center justify-center",
        iconGap === "xs" && "gap-1",
        iconGap === "sm" && "gap-1.5",
        iconGap === "md" && "gap-2",
        iconGap === "lg" && "gap-3"
      )}>
        {!isLoading && leftIcon}
        
        {/* Render text or static fallback if no children passed */}
        <span>{isLoading && loadingText ? loadingText : (children || "Static Button")}</span>
        
        {!isLoading && rightIcon}
      </span>

      {/* Advanced Badge Notification Controller Layer */}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] h-4 min-w-4 px-1 rounded-full flex items-center justify-center font-bold border border-white">
          {badgeCount}
        </span>
      )}
    </Comp>
  )
})

Button.displayName = "Button"