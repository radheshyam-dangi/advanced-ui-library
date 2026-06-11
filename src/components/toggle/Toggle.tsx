import * as React from "react"

export interface ToggleProps {
  /** Current checked state */
  checked: boolean
  /** Called with new boolean when toggled */
  onChange: (checked: boolean) => void
  /** Switch size */
  size?: "sm" | "md" | "lg"
  /** Active track colour */
  color?: "purple" | "teal" | "blue" | "red"
  /** Label text */
  label?: string
  /** Sublabel / description beneath the label */
  sublabel?: string
  /** Label position relative to the switch */
  labelPosition?: "left" | "right"
  /** Disable the toggle */
  disabled?: boolean
  /** Show spinner while an async state update is pending */
  loading?: boolean
  /** HTML id forwarded to the internal input */
  id?: string
  className?: string
}

const colorMap: Record<string, string> = {
  purple: "bg-[#aa3bff]",
  teal: "bg-teal-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
}

const sizeMap: Record<string, { track: string; knob: string; on: string; off: string }> = {
  sm: { track: "w-8 h-[18px]", knob: "w-3.5 h-3.5", on: "left-[18px]", off: "left-0.5" },
  md: { track: "w-10 h-[22px]", knob: "w-[18px] h-[18px]", on: "left-[22px]", off: "left-0.5" },
  lg: { track: "w-[52px] h-7", knob: "w-6 h-6", on: "left-[26px]", off: "left-0.5" },
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  size = "md",
  color = "purple",
  label,
  sublabel,
  labelPosition = "right",
  disabled = false,
  loading = false,
  id,
  className,
}) => {
  const inputId = id || React.useId()
  const sz = sizeMap[size] || sizeMap.md
  const trackColor = colorMap[color] || colorMap.purple

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !loading && onChange) {
      onChange(e.target.checked)
    }
  }

  const switchEl = (
    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        role="switch"
        id={inputId}
        checked={checked}
        onChange={handleToggle}
        disabled={disabled || loading}
        aria-checked={checked}
        className="sr-only"
      />
      <label
        htmlFor={inputId}
        className={cn(
          "block rounded-full transition-colors duration-200 cursor-pointer",
          sz.track,
          checked ? trackColor : "bg-zinc-200",
          (disabled || loading) && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 rounded-full bg-white transition-all duration-200 shadow-sm",
            sz.knob,
            checked ? sz.on : sz.off
          )}
        >
          {loading && (
            <svg
              className="animate-spin w-full h-full p-[2px] text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
              <path d="M3 12a9 9 0 019-9" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </label>
    </div>
  )

  const labelEl =
    (label || sublabel) && (
      <div className={labelPosition === "left" ? "mr-3" : "ml-0"}>
        {label && (
          <p className={cn("text-sm font-semibold text-[#08060d]", disabled && "opacity-50")}>
            {label}
          </p>
        )}
        {sublabel && (
          <p className={cn("text-xs text-zinc-400 leading-snug mt-0.5", disabled && "opacity-50")}>
            {sublabel}
          </p>
        )}
      </div>
    )

  return (
    <div
      className={cn(
        "flex items-center",
        labelPosition === "left" ? "flex-row-reverse justify-between" : "flex-row gap-3",
        className
      )}
    >
      {labelPosition === "left" && labelEl}
      {switchEl}
      {labelPosition === "right" && labelEl}
    </div>
  )
}

Toggle.displayName = "Toggle"