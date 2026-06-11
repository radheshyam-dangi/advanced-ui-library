export const selectDocSchema = {
  name: "Select",
  description:
    "A clean, custom-styled native dropdown picker providing consistent look-and-feel across browsers while preserving full accessibility and native keyboard interaction.",

  propsList: [
    {
      name: "options",
      type: "Array<{label: string, value: string | number}>",
      required: false,
      default: "[]",
      description: "Array of selectable options with label and value pairs.",
    },
    {
      name: "label",
      type: "string",
      required: false,
      default: "undefined",
      description: "Descriptive label displayed above the select control.",
    },
    {
      name: "sizeScale",
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: "'md'",
      description: "Controls the height and padding of the select input.",
    },
    {
      name: "isInvalid",
      type: "boolean",
      required: false,
      default: "false",
      description: "When true, applies red error styling to the select border and ring.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      default: "false",
      description: "When true, disables user interaction with the select.",
    },
    {
      name: "value",
      type: "string | number",
      required: false,
      default: "undefined",
      description: "Currently selected option value.",
    },
  ],

  accessibility: [
    "Label is automatically linked to the select using generated IDs.",
    "Native select element preserves all browser keyboard behaviors (arrow keys, type-ahead).",
    "aria-invalid attribute properly communicated to screen readers when isInvalid is true.",
    "Proper color contrast on all states including disabled and error states.",
    "Full keyboard navigation support with standard HTML select element.",
  ],

  usage: `import { Select } from './components'
import { useState } from 'react'

export function Example() {
  const [selected, setSelected] = useState('')

  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]

  return (
    <Select
      label="Choose an option"
      options={options}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      sizeScale="md"
      isInvalid={false}
    />
  )
}`,

  variants: {
    sizes: ["sm", "md", "lg"],
    states: [
      { label: "Default", isInvalid: false, disabled: false },
      { label: "Error", isInvalid: true, disabled: false },
      { label: "Disabled", disabled: true, isInvalid: false },
    ],
  },

  notes: [
    "The Select component wraps the native HTML select element for maximum browser compatibility.",
    "All standard HTML select attributes are supported (disabled, required, multiple, etc.).",
    "Options can contain any string label and string/number value combination.",
    "The default empty option '-- Select an option --' is shown when value is empty.",
  ],
}