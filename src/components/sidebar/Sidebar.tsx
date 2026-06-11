import * as React from "react"

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean
  theme?: "light" | "dark" | "zinc"
  position?: "left" | "right"
  border?: boolean
  animated?: boolean
  children?: React.ReactNode
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, theme = "light", position = "left", border = true, animated = true, children, className, ...props }, ref) => {
    const themeClasses = {
      light: "bg-white text-zinc-900 border-zinc-200",
      dark: "bg-zinc-950 text-white border-zinc-800",
      zinc: "bg-zinc-100 text-zinc-800 border-zinc-300",
    }[theme]

    return (
      <aside
        ref={ref}
        className={[
          "h-full min-h-[300px] flex flex-col p-4 font-sans box-border z-30",
          animated ? "transition-all duration-300" : "transition-none",
          collapsed ? "w-16 items-center" : "w-64",
          border && (position === "left" ? "border-r" : "border-l"),
          themeClasses,
          className
        ].filter(Boolean).join(" ")}
        {...props}
      >
        <div className="w-full flex flex-col gap-2">
          {collapsed ? (
            <div className="w-8 h-8 rounded-lg bg-zinc-200/50 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs mb-4">★</div>
          ) : (
            <div className="text-xs uppercase font-bold tracking-wider text-zinc-400 mb-2 px-2">Navigation Panel</div>
          )}
          
          <div className={["flex flex-col gap-1 w-full", collapsed ? "items-center" : "items-start"].join(" ")}>
            <div className="w-full p-2 rounded-lg bg-blue-600/10 text-blue-600 font-semibold text-xs flex items-center gap-2 cursor-pointer">
              <span>🏠</span> {!collapsed && <span>Home Space</span>}
            </div>
            <div className="w-full p-2 rounded-lg hover:bg-zinc-500/10 text-xs font-medium flex items-center gap-2 cursor-pointer opacity-70">
              <span>📊</span> {!collapsed && <span>Analytics Metrics</span>}
            </div>
          </div>
        </div>
        <div className="mt-auto w-full text-center text-[10px] opacity-40 truncate px-2">{!collapsed && children}</div>
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"