export const headerDocSchema = {
  name: "Header",
  description: "A top banner bar component for branding, search inputs, user navigation status, and layout global controls.",
  propsList: [
    { name: "title", type: "string", default: "Application Dashboard", description: "Branding text copy layout displayed on the far-left strip." },
    { name: "sticky", type: "boolean", default: "false", description: "Pins the header container frame position to the top viewport edge during document scrolling." },
    { name: "theme", type: "'light'|'dark'|'zinc'", default: "'light'", description: "Visual baseline color variations." },
    { name: "border", type: "boolean", default: "true", description: "Applies a separation border at the baseline edge." },
    { name: "compact", type: "boolean", default: "false", description: "Reduces vertical layout padding metrics." },
  ],
  accessibility: [
    "Uses semantic HTML5 <header> region tags natively.",
    "Ensures high contrast ratios across standard light and dark thematic selections.",
  ],
}