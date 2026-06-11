export const inputDocSchema = {
  name: "Input",
  description:
    "A flexible text input with label, validation states, icons, character counter, and clear affordance.",
  propsList: [
    { name: "label", type: "string", default: "", description: "Field label linked via htmlFor." },
    { name: "hint", type: "string", default: "", description: "Helper / error / success text beneath the field." },
    { name: "state", type: "'default'|'error'|'success'", default: "'default'", description: "Validation visual state." },
    { name: "size", type: "'sm'|'md'|'lg'", default: "'md'", description: "Controls height and font size." },
    { name: "leftIcon", type: "ReactNode", default: "", description: "Icon rendered inside the left edge." },
    { name: "rightIcon", type: "ReactNode", default: "", description: "Icon rendered inside the right edge." },
    { name: "clearable", type: "boolean", default: "false", description: "Shows × button when a value is present." },
    { name: "showCount", type: "boolean", default: "false", description: "Displays character counter when maxLength set." },
    { name: "fullWidth", type: "boolean", default: "true", description: "Stretches to fill parent container." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables input interaction." },
    { name: "maxLength", type: "number", default: "", description: "HTML maxlength forwarded to input element." },
  ],
  accessibility: [
    "Label always linked to input via htmlFor — never omitted.",
    "Error and success messages bound via aria-describedby.",
    "aria-invalid='true' set automatically when state is 'error'.",
    "Clear button carries an aria-label for screen reader users.",
    "Character counter reads remaining characters via live region.",
  ],
}
