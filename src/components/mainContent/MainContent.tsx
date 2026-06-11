import * as React from "react"

export interface MainContentProps extends React.HTMLAttributes<HTMLElement> {
  padded?: boolean
  bgColor?: "white" | "zinc" | "slate"
  scrollable?: boolean
  centered?: boolean
  children?: React.ReactNode
}

export const MainContent = React.forwardRef<HTMLElement, MainContentProps>(
  ({ padded = true, bgColor = "zinc", scrollable = true, centered = false, children, className, ...props }, ref) => {
    const bgClasses = {
      white: "bg-white text-zinc-900",
      zinc: "bg-zinc-50 text-zinc-900",
      slate: "bg-slate-100 text-slate-900",
    }[bgColor]

    return (
      <main
        ref={ref}
        className={[
          "flex-1 w-full font-sans box-border min-w-0",
          padded ? "p-6" : "p-0",
          scrollable ? "overflow-y-auto max-h-full" : "overflow-hidden",
          centered ? "flex flex-col items-center justify-center text-center" : "block",
          bgClasses,
          className
        ].filter(Boolean).join(" ")}
        {...props}
      >
        <div className={centered ? "max-w-md" : "w-full"}>
          {children}
        </div>
      </main>
    )
  }
)
MainContent.displayName = "MainContent"