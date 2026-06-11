import * as React from "react"
import { cn } from "../../lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: "default" | "bordered" | "flat" | "elevated"
  /** Adds hover lift effect */
  hoverable?: boolean
  /** Display image placeholder area */
  showImage?: boolean
  /** Image src for the card image */
  imageSrc?: string
  /** Alt text for card image */
  imageAlt?: string
  /** Display avatar / initials circle */
  showAvatar?: boolean
  /** Initials shown in avatar */
  avatarInitials?: string
  /** Avatar background colour */
  avatarColor?: "purple" | "teal" | "blue" | "coral" | "amber"
  /** Show a status badge */
  showBadge?: boolean
  /** Badge text */
  badgeText?: string
  /** Card title */
  title?: string
  /** Card subtitle / body text */
  subtitle?: string
  /** Render action buttons in footer */
  showActions?: boolean
  /** Primary action label */
  primaryAction?: string
  /** Secondary action label */
  secondaryAction?: string
  /** Called when primary action clicked */
  onPrimaryAction?: () => void
  /** Called when secondary action clicked */
  onSecondaryAction?: () => void
  /** Inner padding scale */
  padding?: "sm" | "md" | "lg"
}

const avatarColorMap: Record<string, { bg: string; text: string }> = {
  purple: { bg: "bg-purple-100", text: "text-purple-700" },
  teal: { bg: "bg-teal-100", text: "text-teal-700" },
  blue: { bg: "bg-blue-100", text: "text-blue-700" },
  coral: { bg: "bg-orange-100", text: "text-orange-700" },
  amber: { bg: "bg-amber-100", text: "text-amber-700" },
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hoverable = false,
      showImage = false,
      imageSrc,
      imageAlt = "",
      showAvatar = false,
      avatarInitials = "AK",
      avatarColor = "purple",
      showBadge = false,
      badgeText = "New",
      title,
      subtitle,
      showActions = false,
      primaryAction = "View details",
      secondaryAction = "Share",
      onPrimaryAction,
      onSecondaryAction,
      padding = "md",
      children,
      ...rest
    },
    ref
  ) => {
    const { bg: avBg, text: avText } = avatarColorMap[avatarColor] ?? avatarColorMap.purple

    return (
      <div
        ref={ref}
        role={rest.onClick || hoverable ? "button" : undefined}
        tabIndex={rest.onClick || hoverable ? 0 : undefined}
        className={cn(
          "rounded-2xl bg-white transition-all duration-200",

          // Variants
          variant === "default" && "border border-[#e5e4e7]",
          variant === "bordered" && "border-2 border-[#e5e4e7]",
          variant === "flat" && "bg-[#f4f3ec] border-0",
          variant === "elevated" && "border border-[#e5e4e7] shadow-lg",

          // Padding
          padding === "sm" && "p-3",
          padding === "md" && "p-5",
          padding === "lg" && "p-7",

          // Hoverable
          hoverable && "cursor-pointer hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#aa3bff]/40",

          className
        )}
        {...rest}
      >
        {/* Card image */}
        {showImage && (
          <div className="w-full h-36 rounded-xl bg-zinc-100 flex items-center justify-center mb-4 overflow-hidden">
            {imageSrc ? (
              <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
        )}

        {/* Avatar + badge row */}
        {(showAvatar || showBadge) && (
          <div className="flex items-center justify-between mb-3">
            {showAvatar && (
              <div className={cn("w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm", avBg, avText)}>
                {avatarInitials}
              </div>
            )}
            {showBadge && (
              <span className="text-[11px] font-semibold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                {badgeText}
              </span>
            )}
          </div>
        )}

        {/* Title + subtitle */}
        {title && <p className="text-[15px] font-semibold text-[#08060d]">{title}</p>}
        {subtitle && <p className="text-[13px] text-zinc-500 leading-relaxed mt-1">{subtitle}</p>}

        {/* Slot for custom children */}
        {children}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-[#e5e4e7]">
            <button
              type="button"
              onClick={onSecondaryAction}
              className="flex-1 py-2 text-xs font-semibold rounded-lg border border-[#e5e4e7]
                text-[#08060d] hover:bg-zinc-50 transition-colors"
            >
              {secondaryAction}
            </button>
            <button
              type="button"
              onClick={onPrimaryAction}
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#aa3bff] text-white
                hover:bg-[#912ee6] transition-colors"
            >
              {primaryAction}
            </button>
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = "Card"