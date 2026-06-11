import * as React from "react"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  sticky?: boolean
  theme?: "light" | "dark" | "zinc"
  border?: boolean
  compact?: boolean
  children?: React.ReactNode
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ title = "Application Dashboard", sticky = false, theme = "light", border = true, compact = false, children, className, ...props }, ref) => {
    const themeClasses = {
      light: "bg-white text-zinc-900 border-zinc-200",
      dark: "bg-zinc-950 text-white border-zinc-800",
      zinc: "bg-zinc-100 text-zinc-800 border-zinc-300",
    }[theme]

    return (
      <header
        ref={ref}
        className={[
          "w-full flex items-center justify-between transition-all duration-150 font-sans z-40",
          compact ? "px-4 py-2.5" : "px-6 py-4",
          sticky ? "sticky top-0" : "relative",
          border && "border-b",
          themeClasses,
          className
        ].filter(Boolean).join(" ")}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm">▲</div>
          <span className="font-bold text-sm tracking-tight">{title}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-medium opacity-90">
          {children}
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"