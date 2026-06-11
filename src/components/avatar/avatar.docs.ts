export const avatarDocSchema = {
  name: "Avatar",
  description: "A profile image thumbnail component with intelligent automated initial text fallbacks and real-time user lifecycle presence indicators.",
  propsList: [
    { name: "src", type: "string", default: "undefined", description: "Remote graphic element asset source location URL pathing." },
    { name: "alt", type: "string", default: "'User Profile'", description: "Semantic alternative image descriptive text track for screen readers." },
    { name: "size", type: "'sm'|'md'|'lg'|'xl'", default: "'md'", description: "Controls physical diameter bounding box scale metrics." },
    { name: "variant", type: "'none'|'ring'|'bordered'", default: "'none'", description: "Applies optional decorative bounding accent ring overlays." },
    { name: "status", type: "'none'|'online'|'offline'|'away'|'busy'", default: "'none'", description: "Appends color-coded presence status indicator element dots." },
    { name: "fallbackText", type: "string", default: "'U'", description: "Character text string displayed if the primary image asset yields a fetch fault." }
  ],
  accessibility: [
    "Implicitly hooks semantic alt labels onto embedded image tags.",
    "Automated fallbacks safely toggle layout hidden states if images break down.",
    "Status indicators map directly inside parent bounding frames ensuring screen context isn't fragmented."
  ]
}