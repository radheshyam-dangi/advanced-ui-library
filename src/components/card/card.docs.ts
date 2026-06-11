export const cardDocSchema = {
  name: "Card",
  description:
    "A composable surface container for grouping related content with image, avatar, badge, and action slots.",
  propsList: [
    { name: "variant", type: "'default'|'bordered'|'flat'|'elevated'", default: "'default'", description: "Visual surface style." },
    { name: "hoverable", type: "boolean", default: "false", description: "Adds pointer cursor and lift animation on hover." },
    { name: "showImage", type: "boolean", default: "false", description: "Renders an image or placeholder at the top." },
    { name: "imageSrc", type: "string", default: "undefined", description: "URL for the card image." },
    { name: "showAvatar", type: "boolean", default: "false", description: "Renders an initials avatar circle." },
    { name: "avatarInitials", type: "string", default: "'AK'", description: "Initials displayed inside avatar." },
    { name: "avatarColor", type: "'purple'|'teal'|'blue'|'coral'|'amber'", default: "'purple'", description: "Avatar background colour." },
    { name: "showBadge", type: "boolean", default: "false", description: "Shows a status badge in the header." },
    { name: "badgeText", type: "string", default: "'New'", description: "Text inside the badge." },
    { name: "title", type: "string", default: "undefined", description: "Card heading." },
    { name: "subtitle", type: "string", default: "undefined", description: "Supporting body text." },
    { name: "showActions", type: "boolean", default: "false", description: "Renders primary + secondary action buttons." },
    { name: "padding", type: "'sm'|'md'|'lg'", default: "'md'", description: "Inner padding scale." },
  ],
  accessibility: [
    "Clickable cards receive role='button' and tabIndex automatically.",
    "Images always require non-empty alt text for meaningful visuals.",
    "Action buttons are individually focusable and labelled.",
    "Hoverable state adds visible focus ring for keyboard navigation.",
    "Badge text is readable without relying on colour alone.",
  ],
}