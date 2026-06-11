import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label */
  label?: string
  /** Hint / helper text below the input */
  hint?: string
  /** Validation state */
  state?: "default" | "error" | "success"
  /** Input size */
  size?: "sm" | "md" | "lg"
  /** Icon rendered on the left */
  leftIcon?: React.ReactNode
  /** Icon rendered on the right */
  rightIcon?: React.ReactNode
  /** Show a clear (×) button when there is a value */
  clearable?: boolean
  /** Show character counter when maxLength is set */
  showCount?: boolean
  /** Stretch to fill parent */
  fullWidth?: boolean
  /** Called when clear button is clicked */
  onClear?: () => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hint,
      state = "default",
      size = "md",
      leftIcon,
      rightIcon,
      clearable = false,
      showCount = false,
      fullWidth = true,
      onClear,
      id,
      maxLength,
      value,
      defaultValue,
      onChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const hintId = `${inputId}-hint`
    
    // Clean initial fallback to avoid "undefined" strings
    const [internalValue, setInternalValue] = React.useState<string>(
      () => (value ?? defaultValue ?? "") as string
    )

    // Synchronize internal state securely with parent value modifications
    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        const stringValue = String(value)
        setInternalValue(stringValue === "undefined" || stringValue === "null" ? "" : stringValue)
      } else {
        setInternalValue("")
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    // Handles clearing both local component state and signaling parent states
    const handleClear = () => {
      setInternalValue("")
      
      // 1. Fire the dedicated clear callback if provided
      if (onClear) {
        onClear()
      }
      
      // 2. Dispatch a clean mock change event to clear out traditional onChange values
      if (onChange) {
        const mockEvent = {
          target: { value: "" }
        } as React.ChangeEvent<HTMLInputElement>
        onChange(mockEvent)
      }
    }

    const hasLeft = !!leftIcon
    const hasRight = !!rightIcon || (clearable && internalValue.length > 0)

    return (
      <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-zinc-500 select-none"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left icon */}
          {hasLeft && (
            <span
              className="absolute left-2.5 text-zinc-400 pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            value={internalValue}
            onChange={handleChange}
            disabled={disabled}
            maxLength={maxLength}
            aria-invalid={state === "error" || undefined}
            aria-describedby={hint ? hintId : undefined}
            className={cn(
              "w-full border rounded-md bg-white text-[#08060d] transition-colors duration-150",
              "outline-none placeholder:text-zinc-400",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:ring-2 focus:ring-[#aa3bff]/30",

              // Size Layout
              size === "sm" && "h-8 text-xs px-3",
              size === "md" && "h-10 text-sm px-3",
              size === "lg" && "h-12 text-base px-4",

              // State borders
              state === "default" && "border-[#e5e4e7] focus:border-[#aa3bff]",
              state === "error" && "border-red-400 focus:border-red-500 focus:ring-red-200",
              state === "success" && "border-green-400 focus:border-green-500 focus:ring-green-200",

              // Conditional inner layout adjustments
              hasLeft && (size === "lg" ? "pl-10" : "pl-8"),
              hasRight && (size === "lg" ? "pr-10" : "pr-8"),

              className
            )}
            {...rest}
          />

          {/* Right Icon / Clear Trigger Action Button */}
          {hasRight && (
            <span className="absolute right-2.5 flex items-center gap-1">
              {clearable && internalValue.length > 0 ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear input"
                  className="text-zinc-400 hover:text-zinc-600 transition-colors p-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-400 rounded"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              ) : rightIcon ? (
                <span className="text-zinc-400 pointer-events-none" aria-hidden="true">
                  {rightIcon}
                </span>
              ) : null}
            </span>
          )}
        </div>

        {/* Bottom Metadata row */}
        <div className="flex items-center justify-between gap-2">
          {hint && (
            <p
              id={hintId}
              className={cn(
                "text-xs",
                state === "error" && "text-red-500",
                state === "success" && "text-green-600",
                state === "default" && "text-zinc-400"
              )}
            >
              {hint}
            </p>
          )}
          {showCount && maxLength && (
            <p className="text-xs text-zinc-400 ml-auto">
              {internalValue.length} / {maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"