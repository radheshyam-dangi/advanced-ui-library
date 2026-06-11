import * as React from "react"
import { cn } from "../../lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remote image source URL */
  src?: string
  /** Alternative text description for accessibility */
  alt?: string
  /** Avatar size scale */
  size?: "sm" | "md" | "lg" | "xl"
  /** Border variant options */
  variant?: "none" | "ring" | "bordered"
  /** Status indicator dot type */
  status?: "none" | "online" | "offline" | "away" | "busy"
  /** Fallback initials text shown when source fails */
  fallbackText?: string
  /** Loading optimization strategy */
  loading?: "eager" | "lazy"
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "User Profile",
      size = "md",
      variant = "none",
      status = "none",
      fallbackText = "U",
      loading = "lazy",
      ...rest
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false)

    // Reset error state if src changes
    React.useEffect(() => {
      setHasError(false)
    }, [src])

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 rounded-full select-none bg-zinc-200 text-zinc-700 font-semibold",
          
          // Sizes
          size === "sm" && "h-8 w-8 text-xs",
          size === "md" && "h-12 w-12 text-sm",
          size === "lg" && "h-16 w-16 text-base",
          size === "xl" && "h-20 w-20 text-xl",

          // Variants
          variant === "ring" && "ring-2 ring-[#aa3bff] ring-offset-2 ring-offset-white",
          variant === "bordered" && "border-2 border-[#e5e4e7]",

          className
        )}
        {...rest}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            loading={loading}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <span className="uppercase tracking-wider">
            {fallbackText.slice(0, 2)}
          </span>
        )}

        {/* Status indicator dot layout */}
        {status !== "none" && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
              
              // Status Indicator Dot Sizes
              size === "sm" && "h-2 w-2",
              size === "md" && "h-3 w-3",
              size === "lg" && "h-4 w-4",
              size === "xl" && "h-5 w-5",

              // Colors
              status === "online" && "bg-green-500",
              status === "offline" && "bg-gray-400",
              status === "away" && "bg-amber-400",
              status === "busy" && "bg-red-500"
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"