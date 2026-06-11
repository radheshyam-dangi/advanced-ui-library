import * as React from "react"

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
  closeOnBackdrop?: boolean
  showCloseBtn?: boolean
  showFooter?: boolean
  animation?: "fade" | "slide" | "scale"
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  children?: React.ReactNode
  className?: string
}

const sizeMap: Record<string, string> = {
  sm: "max-w-xs",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
}

// Inject standard layout animations into document layout header contexts
if (typeof document !== "undefined" && !document.getElementById("modal-animations")) {
  const style = document.createElement("style")
  style.id = "modal-animations"
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
    .modal-fade { animation: fadeIn 0.2s ease-out }
    .modal-slide { animation: slideUp 0.25s ease-out }
    .modal-scale { animation: scaleIn 0.2s ease-out }
  `
  document.head.appendChild(style)
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open = false,
      onClose,
      title,
      size = "md",
      closeOnBackdrop = true,
      showCloseBtn = true,
      showFooter = true,
      animation = "scale",
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      onConfirm,
      children,
      className,
    },
    ref
  ) => {
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const titleId = React.useId()

    const cleanTitle = React.useMemo(() => {
      if (!title || typeof title !== "string") return ""
      return title.trim()
    }, [title])

    const animClass = React.useMemo(() => {
      if (animation === "fade") return "modal-fade"
      if (animation === "slide") return "modal-slide"
      return "modal-scale"
    }, [animation])

    // Side-effect: Lock document scrolling structure safely
    React.useEffect(() => {
      if (!open) return
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }, [open])

    // Native access keyboard tracking rules (Esc and Tab loops)
    React.useEffect(() => {
      if (!open) return

      const prevActiveElement = document.activeElement as HTMLElement | null

      const timeoutId = setTimeout(() => {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), [href]"
        )
        if (focusables?.[0]) {
          focusables[0].focus()
        }
      }, 30)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          if (onClose) onClose()
        }

        if (e.key === "Tab") {
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled]), input:not([disabled]), [href]"
          )
          if (!focusables || focusables.length === 0) return

          const firstEl = focusables[0]
          const lastEl = focusables[focusables.length - 1]

          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault()
            lastEl.focus()
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault()
            firstEl.focus()
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener("keydown", handleKeyDown)
        if (prevActiveElement?.focus) {
          prevActiveElement.focus()
        }
      }
    }, [open, onClose])

    // If 'open' toggle checkbox is unchecked, completely strip from layout preview block area
    if (!open) {
      return (
        <div className="text-center p-8 text-zinc-400 border border-dashed border-zinc-700 rounded-lg bg-zinc-900/50">
          Modal hidden. Toggle the <strong className="text-blue-400">open</strong> property checkbox inside the panel controls below to display.
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby={cleanTitle ? titleId : undefined}
      >
        {/* Backdrop Element */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm modal-fade"
          onClick={(e) => {
            if (closeOnBackdrop && onClose) onClose()
          }}
          aria-hidden="true"
        />

        {/* Modal Main Layout Shield Container */}
        <div
          ref={dialogRef}
          className={cn(
            "relative w-full rounded-xl bg-white text-left shadow-2xl border border-gray-100 z-10 flex flex-col overflow-hidden max-h-[85vh]",
            sizeMap[size] || sizeMap.md,
            animClass,
            className
          )}
        >
          {/* Top Header Region */}
          {(cleanTitle || showCloseBtn) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
              {cleanTitle ? (
                <h2 id={titleId} className="text-base font-bold text-gray-900 tracking-tight">
                  {cleanTitle}
                </h2>
              ) : <div />}
              
              {showCloseBtn && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onClose) onClose();
                  }}
                  aria-label="Close dialog"
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                  title="Close (Esc)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Core Content Body */}
          <div className="px-6 py-5 text-sm text-gray-600 flex-1 overflow-y-auto leading-relaxed">
            {children || <p className="text-gray-400 italic">No content template provided.</p>}
          </div>

          {/* Underfoot Actions Strip */}
          {showFooter && (
            <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 border-t border-gray-100 bg-gray-50/70">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onClose) onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onConfirm) onConfirm();
                  else if (onClose) onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm focus:outline-none"
              >
                {confirmLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Modal.displayName = "Modal"