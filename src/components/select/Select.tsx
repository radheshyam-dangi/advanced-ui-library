import * as React from "react"

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "options"> {
  /** Accept an array of options, a comma-separated string, or an object from playground panels */
  options?: SelectOption[] | string | any
  /** Helper text label placed above layout */
  label?: string
  /** Error state flag tracking invalid input operations */
  isInvalid?: boolean
  /** Visual dimension footprint height scale */
  sizeScale?: "sm" | "md" | "lg"
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      isInvalid = false,
      sizeScale = "md",
      disabled,
      value,
      onChange,
      children,
      ...rest
    },
    ref
  ) => {
    const id = React.useId()

    // 1. Sanitize incoming boolean states from the control deck
    const cleanIsInvalid = isInvalid === true || String(isInvalid) === "true"
    const cleanDisabled = disabled === true || String(disabled) === "true"

    // 2. Local state array to manage the runtime list item additions, edits, and deletions
    const [localOptions, setLocalOptions] = React.useState<SelectOption[]>([])
    // Tracks currently chosen option for the native select node
    const [selectedValue, setSelectedValue] = React.useState<string>("")

    // 3. Parse incoming baseline props array or fallback comma-separated string values safely
    const parsedPropsOptions = React.useMemo<SelectOption[]>(() => {
      if (!options || options === "undefined" || options === "null") return []

      if (Array.isArray(options)) {
        return options.map((opt) => {
          if (typeof opt === "object" && opt !== null) {
            return {
              label: String(opt.label ?? opt.value ?? ""),
              value: String(opt.value ?? opt.label ?? ""),
            }
          }
          return { label: String(opt), value: String(opt) }
        })
      }

      if (typeof options === "string" && options.trim() !== "") {
        const cleanedStr = options.trim()

        if (cleanedStr.startsWith("[")) {
          try {
            const parsed = JSON.parse(cleanedStr)
            if (Array.isArray(parsed)) {
              return parsed.map((opt) => {
                if (typeof opt === "object" && opt !== null) {
                  return {
                    label: String(opt.label ?? opt.value ?? ""),
                    value: String(opt.value ?? opt.label ?? ""),
                  }
                }
                return { label: String(opt), value: String(opt) }
              })
            }
          } catch (e) {
            console.warn("Select JSON parsing context failure:", e)
          }
        }

        return cleanedStr.split(",").map((item) => {
          const text = item.trim()
          return { label: text, value: text }
        })
      }

      return []
    }, [options])

    // Sync state layout whenever incoming playground properties are re-configured
    React.useEffect(() => {
      setLocalOptions(parsedPropsOptions)
    }, [parsedPropsOptions])

    // Sync chosen value when controlled prop changes
    React.useEffect(() => {
      if (value !== undefined && value !== "undefined" && value !== "null") {
        setSelectedValue(String(value))
      }
    }, [value])

    // 4. Action Handlers for Item List Management
    const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      
      const itemText = prompt("Enter text label for the new option:")
      if (!itemText || itemText.trim() === "") return

      const newItem: SelectOption = {
        label: itemText.trim(),
        value: itemText.trim().toLowerCase().replace(/\s+/g, "-")
      }

      setLocalOptions((prev) => [...prev, newItem])
    }

    const handleEditItem = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (!selectedValue) {
        alert("Please click and select an item from the dropdown list first to edit it.")
        return
      }

      const itemToEdit = localOptions.find((opt) => String(opt.value) === selectedValue)
      if (!itemToEdit) return

      const updatedText = prompt("Update item text label:", itemToEdit.label)
      if (!updatedText || updatedText.trim() === "") return

      setLocalOptions((prev) =>
        prev.map((opt) =>
          String(opt.value) === selectedValue
            ? { ...opt, label: updatedText.trim() }
            : opt
        )
      )
    }

    const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (!selectedValue) {
        alert("Please click and select an item from the dropdown list first to remove it.")
        return
      }

      setLocalOptions((prev) => prev.filter((opt) => String(opt.value) !== selectedValue))
      setSelectedValue("") // clear out selection mapping index references
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const targetVal = e.target.value
      setSelectedValue(targetVal)

      if (onChange && typeof onChange === "function") {
        onChange(e)
      } else {
        console.log("Playground Emitter: Changed to ->", targetVal)
      }
    }

    return (
      <div className="w-full flex flex-col gap-2.5 text-left">
        {/* Label Block */}
        {label && label !== "undefined" && label !== "null" && (
          <label
            htmlFor={id}
            className="text-xs font-semibold text-zinc-700 tracking-wide uppercase select-none"
          >
            {label}
          </label>
        )}

        {/* Core Dropdown Wrapper Layout */}
        <div className="relative w-full">
          <select
            id={id}
            ref={ref}
            disabled={cleanDisabled}
            value={selectedValue}
            onChange={handleSelectChange}
            aria-invalid={cleanIsInvalid || undefined}
            className={cn(
              "w-full appearance-none rounded-md bg-white border border-[#e5e4e7]",
              "text-[#08060d] text-sm font-medium outline-none transition-all duration-200 cursor-pointer",
              "focus:border-[#aa3bff] focus:ring-2 focus:ring-[#aa3bff]/30",
              "disabled:bg-zinc-50 disabled:text-zinc-400 disabled:pointer-events-none disabled:cursor-not-allowed",

              // Sizes Layout
              sizeScale === "sm" && "h-8 pl-3 pr-8 text-xs",
              sizeScale === "md" && "h-10 pl-4 pr-10 text-sm",
              sizeScale === "lg" && "h-12 pl-5 pr-12 text-base",

              // Invalid variant highlights
              cleanIsInvalid && "border-red-500 focus:border-red-500 focus:ring-red-500/20",

              className
            )}
            {...rest}
          >
            <option value="">-- Select an option --</option>
            
            {localOptions.map((opt, index) => (
              <option key={`${opt.value}-${index}`} value={opt.value}>
                {opt.label}
              </option>
            ))}

            {children}
          </select>

          {/* Custom SVG Chevron Arrow Node */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-400">
            <svg className="h-4 w-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* 5. INTERACTIVE CRUD LIST CONTROLLER TOOLBAR BAR */}
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          <button
            type="button"
            onClick={handleAddItem}
            className="px-2.5 py-1 text-[11px] font-bold bg-[#aa3bff] hover:bg-[#912ee6] text-white rounded transition-colors cursor-pointer focus:outline-none"
          >
            ➕ Add Item
          </button>
          
          <button
            type="button"
            onClick={handleEditItem}
            className="px-2.5 py-1 text-[11px] font-bold bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!selectedValue}
          >
            ✏️ Edit Selected
          </button>
          
          <button
            type="button"
            onClick={handleRemoveItem}
            className="px-2.5 py-1 text-[11px] font-bold bg-red-600 hover:bg-red-700 text-white rounded transition-colors cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!selectedValue}
          >
            🗑️ Remove Selected
          </button>
        </div>
      </div>
    )
  }
)

Select.displayName = "Select"
