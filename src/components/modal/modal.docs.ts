export const modalDocSchema = {
  name: "Modal",
  description: "An interactive overlay window for critical action confirmations, system dialog workflows, and contextual information layouts.",
  propsList: [
    { name: "open", type: "boolean", default: "true", description: "Controls whether the modal viewport canvas is actively visible." },
    { name: "title", type: "string", default: "Confirm Action Window", description: "Header title string content displayed at the top bar." },
    { name: "size", type: "'sm'|'md'|'lg'|'xl'", default: "'md'", description: "Controls maximum width viewport constraints." },
    { name: "animation", type: "'fade'|'slide'|'scale'", default: "'scale'", description: "Entrance animation styles." },
    { name: "closeOnBackdrop", type: "boolean", default: "true", description: "Allows overlay dismissal by clicking the dark blurred background canvas region." },
    { name: "showCloseBtn", type: "boolean", default: "true", description: "Renders the absolute positioned ('×') cross button control in the header block." },
    { name: "showFooter", type: "boolean", default: "true", description: "Toggles rendering visibility layout parameters of action confirmation buttons bottom strip." },
    { name: "confirmLabel", type: "string", default: "Confirm", description: "Primary confirmation button display typography title label string." },
    { name: "cancelLabel", type: "string", default: "Cancel", description: "Secondary cancel button background copy text label string." },
  ],
  accessibility: [
    "aria-modal='true' traps focus visibility interactions natively inside current tree node structures.",
    "role='dialog' identifies semantic structural markup frames safely.",
    "Binds viewport key listeners listening to escape keyboard inputs natively.",
  ],
}