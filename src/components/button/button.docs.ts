export const buttonDocSchema = {
  name: "Button",
  description:
    "An advanced, interactive button element triggering semantic workflows with precise functional controllers.",
  propsList: [
    { name: "variant", type: "'default'|'outline'|'secondary'|'destructive'|'ghost'|'glass'", default: "'default'", description: "Visual style variant." },
    { name: "size", type: "'xs'|'sm'|'default'|'lg'|'xl'", default: "'default'", description: "Controls padding and height scale." },
    { name: "fullWidth", type: "boolean", default: "false", description: "Stretches to fill parent container." },
    { name: "rounded", type: "'none'|'sm'|'md'|'lg'|'full'", default: "'md'", description: "Corner radius scale." },
    { name: "elevation", type: "'none'|'sm'|'md'|'lg'", default: "'none'", description: "Drop shadow depth." },
    { name: "isLoading", type: "boolean", default: "false", description: "Shows spinner and disables interaction." },
    { name: "loadingText", type: "string", default: "undefined", description: "Label shown while loading." },
    { name: "animation", type: "'none'|'pulse'|'bounce'|'scaleUp'|'shake'", default: "'none'", description: "CSS keyframe micro-interaction." },
    { name: "hapticFeedback", type: "boolean", default: "false", description: "Triggers vibration if device supports it." },
    { name: "badgeCount", type: "number", default: "undefined", description: "Floating notification counter." },
    { name: "leftIcon", type: "ReactNode", default: "undefined", description: "Icon prepended to label." },
    { name: "rightIcon", type: "ReactNode", default: "undefined", description: "Icon appended to label." },
    { name: "iconGap", type: "'xs'|'sm'|'md'|'lg'", default: "'sm'", description: "Gap between icon and label." },
    { name: "asChild", type: "boolean", default: "false", description: "Renders as Radix Slot child element." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables the button natively." },
  ],
  accessibility: [
    "Uses native <button> with full keyboard support (Space + Enter).",
    "isLoading sets aria-busy='true' for screen readers.",
    "badgeCount is included in aria-label for assistive tech.",
    "disabled removes from pointer-events but preserves focus ring semantics.",
    "Focus ring is never suppressed across all variants.",
  ],
}