export const toggleDocSchema = {
  name: "Toggle",
  description:
    "A binary switch control for enabling or disabling settings — with size, colour, label positioning, and loading state.",
  
  propsList: [
    {
      name: "checked",
      type: "boolean",
      required: true,
      default: "false",
      description: "Current on/off state of the toggle.",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      required: true,
      default: "undefined",
      description: "Callback function called with new boolean value when user toggles the switch.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: "'md'",
      description: "Controls the size of the toggle track and knob.",
    },
    {
      name: "color",
      type: "'purple' | 'teal' | 'blue' | 'red'",
      required: false,
      default: "'purple'",
      description: "Color of the active track background when toggle is checked.",
    },
    {
      name: "label",
      type: "string",
      required: false,
      default: "undefined",
      description: "Primary label text displayed next to or above the toggle.",
    },
    {
      name: "sublabel",
      type: "string",
      required: false,
      default: "undefined",
      description: "Secondary description text displayed below the main label.",
    },
    {
      name: "labelPosition",
      type: "'left' | 'right'",
      required: false,
      default: "'right'",
      description: "Position of the label relative to the toggle switch.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      default: "false",
      description: "When true, disables user interaction and dims the toggle.",
    },
    {
      name: "loading",
      type: "boolean",
      required: false,
      default: "false",
      description: "When true, shows a spinner inside the knob indicating async operation.",
    },
  ],

  accessibility: [
    "Uses role='switch' with aria-checked for semantic meaning.",
    "Label is always linked to the input — clicking label or switch toggles state.",
    "Disabled state is properly communicated to assistive technologies.",
    "Loading state shown with visual spinner — no aria-label needed in preview context.",
    "Keyboard users can tab to the toggle and use Space/Enter to toggle.",
  ],

  usage: `import { Toggle } from './components'
import { useState } from 'react'

export function Example() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Toggle
      checked={enabled}
      onChange={setEnabled}
      label="Enable Feature"
      sublabel="This will turn on the feature"
      color="purple"
      size="md"
    />
  )
}`,

  variants: {
    sizes: ["sm", "md", "lg"],
    colors: ["purple", "teal", "blue", "red"],
    labelPositions: ["left", "right"],
    states: [
      { label: "Unchecked", checked: false },
      { label: "Checked", checked: true },
      { label: "Disabled", disabled: true, checked: false },
      { label: "Loading", loading: true, checked: true },
    ],
  },
}