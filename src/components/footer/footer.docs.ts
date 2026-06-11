export const footerDocSchema = {
  name: "Footer",
  description: "A simple bottom block structural container framework for displaying contextual copyright data, compliance text loops, or reference indexes.",
  propsList: [
    { name: "theme", type: "'light'|'dark'|'zinc'", default: "'light'", description: "Color palette theme configurations." },
    { name: "border", type: "boolean", default: "true", description: "Renders a structural separation boundary rule at the top layout margin." },
    { name: "centered", type: "boolean", default: "false", description: "Aligns all block contents centrally across coordinates." },
    { name: "fluid", type: "boolean", default: "false", description: "Expands horizontal spacing padding configurations to maximum width limits." },
  ],
  accessibility: [
    "Uses semantic HTML5 <footer> structural layout regions safely.",
  ],
}