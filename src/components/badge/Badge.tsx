import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour / semantic variant */
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple"
  /** Size scale */
  size?: "sm" | "md" | "lg"
  /** Show a coloured dot before the label */
  dot?: boolean
  /** Icon prepended inside the badge */
  icon?: React.ReactNode
  /** Corner rounding */
  rounded?: "md" | "full"
  /** Outline style instead of filled */
  outline?: boolean
  /** Show dismiss (×) button */
  dismissible?: boolean
  /** Numeric count shown inside badge */
  count?: number
  /** Cap displayed count at this value (shows "99+") */
  maxCount?: number
  /** Subtle ping animation behind the dot */
  animate?: boolean
  /** Pins the badge absolutely to the top-right edge of a relative wrapper parent */
  isFloating?: boolean
}

const variantMap = {
  default: { bg: "bg-zinc-100", text: "text-zinc-700", dot: "bg-zinc-400", border: "border-zinc-300" },
  success: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500", border: "border-green-400" },
  warning: { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500", border: "border-amber-400" },
  danger: { bg: "bg-[#e54d4d]", text: "text-white/95", dot: "bg-white", border: "border-red-600" },
  info: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-400" },
  purple: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500", border: "border-purple-400" },
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dot = false,
      icon,
      rounded = "full",
      outline = false,
      dismissible = false,
      count,
      maxCount = 9,
      animate = false,
      isFloating = false,
      children,
      ...rest
    },
    ref
  ) => {
    // Local state to track click-to-hide behavior in the playground
    const [isDismissed, setIsDismissed] = React.useState(false)

    // Watch the playground's parameters to reset visibility automatically
    React.useEffect(() => {
      setIsDismissed(false)
    }, [dismissible, count, variant])

    const colors = variantMap[variant] ?? variantMap.default
    const displayCount = count !== undefined ? (count > maxCount ? `${maxCount}+` : count) : null

    // Hide if count is 0 or if the element was manually dismissed via the cross icon
    if (count === 0 || isDismissed) return null

    return (
      <span
        ref={ref}
        role="status"
        className={cn(
          "inline-flex items-center justify-center font-medium font-sans leading-none select-none tracking-normal antialiased text-center",

          // Floating Anchor Layout
          isFloating && "absolute top-2 right-0 translate-x-[40%] -translate-y-[30%] z-30",

          // Sizing Scale rules
          size === "sm" && "text-[10px] h-5 min-w-[20px] px-1 pt-[1px]",
          size === "md" && "text-[12px] h-6 min-w-[24px] px-2 pt-[1px]", 
          size === "lg" && "text-[14px] h-7 min-w-[28px] px-2.5 pt-[1px]",

          // Rounding shapes
          rounded === "full" && "rounded-full",
          rounded === "md" && "rounded-md",

          // Fills & Borders
          !outline && [colors.bg, colors.text],
          outline && ["bg-transparent border", colors.text, colors.border],

          className
        )}
        {...rest}
      >
        {/* Animated dot indicator */}
        {dot && animate && (
          <span className="relative flex items-center justify-center w-2 h-2 mr-1">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-50", colors.dot)} />
            <span className={cn("relative inline-flex rounded-full w-1.5 h-1.5", colors.dot)} />
          </span>
        )}

        {/* Static dot */}
        {dot && !animate && (
          <span className={cn("w-1.5 h-1.5 rounded-full mr-1", colors.dot)} aria-hidden="true" />
        )}

        {/* Icon slot */}
        {icon && <span className="mr-1 flex items-center" aria-hidden="true">{icon}</span>}

        {/* Count Label */}
        <span className="inline-block align-middle">{displayCount !== null ? displayCount : children}</span>

        {/* Active Dismissal Trigger UI */}
        {dismissible && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDismissed(true) // Hides the badge instantly inside the local node tree
            }}
            aria-label="Dismiss status notification"
            className="ml-1 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity focus:outline-none rounded cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = "Badge"
