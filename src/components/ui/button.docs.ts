export const buttonDocSchema = {
  name: "Button",
  description: "An advanced, interactive button element triggering semantic workflows with precise functional controllers.",
  propsList: [
    { name: "variant", type: "enum", default: "default", description: "Sets structural color palette mapping layout." },
    { name: "size", type: "enum", default: "default", description: "Controls viewport padding and vertical density scale." },
    { name: "fullWidth", type: "boolean", default: "false", description: "Forces standard display blocks block orientation." },
    { name: "rounded", type: "enum", default: "md", description: "Defines corner smooth rounding masks mapping." },
    { name: "elevation", type: "enum", default: "none", description: "Applies depth management shadow maps." },
    { name: "isLoading", type: "boolean", default: "false", description: "Interrupts normal execution flow with active loaders." },
    { name: "loadingText", type: "string", default: "undefined", description: "Label rendered explicitly while loading state is active." },
    { name: "animation", type: "enum", default: "none", description: "Applies runtime css keyframe micro-interactions." },
    { name: "hapticFeedback", type: "boolean", default: "false", description: "Triggers web hardware pulse intervals if hardware supports." },
    { name: "badgeCount", type: "number", default: "undefined", description: "Appends absolute floating status counters layer." },
    { name: "leftIcon", type: "ReactNode", default: "undefined", description: "Prepends graphic semantic icons node." },
    { name: "rightIcon", type: "ReactNode", default: "undefined", description: "Appends graphic semantic icons node." },
    { name: "iconGap", type: "enum", default: "sm", description: "Modifies gaps metrics inside flex orientation items." }
  ],
  accessibility: [
    "Implicit native semantic mappings using button descriptors.",
    "Runtime aria attribute handling when disabled or dynamically computing loaders.",
    "Keyboard navigation mapping verified under continuous sequence indexes (Space / Enter)."
  ]
}