export const sidebarDocSchema = {
  name: "Sidebar",
  description: "A vertical left-side navigation frame layout designed for application route trees, icon menu indicators, and branding lists.",
  propsList: [
    { name: "collapsed", type: "boolean", default: "false", description: "Toggles a compact width profile showing only primary menu elements." },
    { name: "theme", type: "'light'|'dark'|'zinc'", default: "'light'", description: "Color theme options." },
    { name: "position", type: "'left'|'right'", default: "'left'", description: "Anchors the panel frame placement onto the screen sides." },
    { name: "border", type: "boolean", default: "true", description: "Toggles secondary framework partition boundaries borders." },
    { name: "animated", type: "boolean", default: "true", description: "Smooth width transition modifications when toggling size profiles." },
  ],
  accessibility: [
    "Uses semantic HTML5 <aside> block containers natively.",
    "Binds structured navigation items securely inside standard markup schemas.",
  ],
}