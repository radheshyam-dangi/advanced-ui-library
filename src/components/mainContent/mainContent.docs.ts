export const mainContentDocSchema = {
  name: "MainContent",
  description: "A primary centralized view layout container canvas used for injecting core page dashboards, table elements, and content view streams.",
  propsList: [
    { name: "padded", type: "boolean", default: "true", description: "Adds responsive inner viewport buffer cushions layouts." },
    { name: "bgColor", type: "'white'|'zinc'|'slate'", default: "'zinc'", description: "Background canvas layer color palettes." },
    { name: "scrollable", type: "boolean", default: "true", description: "Restricts content container bounds and unlocks local frame scrolling rules." },
    { name: "centered", type: "boolean", default: "false", description: "Aligns child block layers centrally across layouts." },
  ],
  accessibility: [
    "Maps semantic HTML5 <main> landmarks natively.",
  ],
}