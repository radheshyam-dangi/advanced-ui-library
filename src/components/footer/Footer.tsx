import * as React from "react"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  theme?: "light" | "dark" | "zinc"
  border?: boolean
  centered?: boolean
  fluid?: boolean
  children?: React.ReactNode
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ theme = "light", border = true, centered = false, fluid = false, children, className, ...props }, ref) => {
    const themeClasses = {
      light: "bg-white text-zinc-500 border-zinc-200",
      dark: "bg-zinc-950 text-zinc-400 border-zinc-800",
      zinc: "bg-zinc-100 text-zinc-600 border-zinc-300",
    }[theme]

    return (
      <footer
        ref={ref}
        className={[
          "w-full text-xs font-sans mt-auto transition-colors duration-150",
          fluid ? "px-4 py-3" : "px-6 py-5",
          border && "border-t",
          themeClasses,
          className
        ].filter(Boolean).join(" ")}
        {...props}
      >
        <div className={["flex flex-wrap items-center gap-4", centered ? "justify-center text-center" : "justify-between"].filter(Boolean).join(" ")}>
          <div>{children}</div>
          <div className="flex gap-4 opacity-80">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"