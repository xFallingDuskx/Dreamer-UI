export interface RichTextEditorIconProps {
  className?: string;
  size?: number;
}

// Text formatting icons
export function Bold({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M4 2v12h5.5c1.38 0 2.5-1.12 2.5-2.5 0-.7-.3-1.33-.78-1.78.48-.45.78-1.08.78-1.78C11 6.12 9.88 5 8.5 5H4zm2 2h2.5c.28 0 .5.22.5.5s-.22.5-.5.5H6V4zm0 4h3c.28 0 .5.22.5.5s-.22.5-.5.5H6V8z"/>
    </svg>
  );
}

export function Italic({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M10 2v2h-1.5l-2 8H8v2H4v-2h1.5l2-8H6V2h4z"/>
    </svg>
  );
}

export function Underline({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 1c2.21 0 4 1.79 4 4v4c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-2.21 1.79-4 4-4zM6 5v4c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2s-2 .9-2 2zM2 14h12v1H2v-1z"/>
    </svg>
  );
}

export function Strikethrough({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8.5 4C7.12 4 6 4.67 6 5.5v.5h2v-.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5S9.78 6 9.5 6H8.5C7.12 6 6 6.67 6 7.5S7.12 9 8.5 9h1c.28 0 .5.22.5.5s-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5V9H6v.5C6 10.33 7.12 11 8.5 11h1c1.38 0 2.5-.67 2.5-1.5S10.88 8 9.5 8H2v-1h12v1H9.5z"/>
    </svg>
  );
}

export function Code({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M4.7 9.3l-2-2c-.4-.4-.4-1 0-1.4l2-2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L4.4 7l1.7 1.7c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zM11.3 6.7l2 2c.4.4.4 1 0 1.4l-2 2c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L11.6 9l-1.7-1.7c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0z"/>
    </svg>
  );
}

export function Link({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M6.879 9.934a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06l-2.5 2.5zM4.5 11.5a2 2 0 0 1 0-2.83L7.33 5.84a2 2 0 0 1 2.83 2.83L7.33 11.5a2 2 0 0 1-2.83 0zm5-5a2 2 0 0 1 0-2.83L12.33 1a2 2 0 0 1 2.83 2.83L12.33 6.5a2 2 0 0 1-2.83 0z"/>
    </svg>
  );
}

export function ListBullet({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M3 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6 4h8v1H6V4zM3 8.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6 8h8v1H6V8zM3 12.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6 12h8v1H6v-1z"/>
    </svg>
  );
}

export function ListOrdered({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 3.5v-1h1v4.5H2V6H1v-.5h1zM6 4h8v1H6V4zM6 8h8v1H6V8zM6 12h8v1H6v-1zM1 8.5h1v1H1v.5h2v-3H1v.5h1v1zM3 11.5v1H1v-1h2z"/>
    </svg>
  );
}

export function Quote({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M3 3h3v3L4.5 8.5H3v-3L4.5 3.5H3V3zM10 3h3v3l-1.5 2.5H10v-3l1.5-2.5H10V3z"/>
    </svg>
  );
}

export function Table({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M1 3h14v10H1V3zm1 1v2h5V4H2zm6 0v2h6V4H8zm-6 3v2h5V7H2zm6 0v2h6V7H8zm-6 3v2h5v-2H2zm6 0v2h6v-2H8z"/>
    </svg>
  );
}

export function HorizontalRule({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M1 7h14v2H1V7z"/>
    </svg>
  );
}

export function Undo({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M1 8c0-3.31 2.69-6 6-6h4v2H7C5.34 4 4 5.34 4 7s1.34 3 3 3h6v2H7c-3.31 0-6-2.69-6-6zM6 6l-4 2 4 2V6z"/>
    </svg>
  );
}

export function Redo({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M15 8c0-3.31-2.69-6-6-6H5v2h4c1.66 0 3 1.34 3 3s-1.34 3-3 3H3v2h6c3.31 0 6-2.69 6-6zM10 6l4 2-4 2V6z"/>
    </svg>
  );
}

export function Header({ className = '', size = 16, level = 1 }: RichTextEditorIconProps & { level?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 3v10h2V9h4v4h2V3H8v4H4V3H2z"/>
      <text x="11" y="12" fontSize="6" fill="currentColor">{level}</text>
    </svg>
  );
}

export function Superscript({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M5 7l2-3h2l-2 3 2 3H7L5 7zM11 2h2v1h-2V2zM11 4h2v1h-2V4z"/>
    </svg>
  );
}

export function Subscript({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M5 7l2-3h2l-2 3 2 3H7L5 7zM11 11h2v1h-2v-1zM11 13h2v1h-2v-1z"/>
    </svg>
  );
}

export function Indent({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M1 3h14v1H1V3zM5 6h10v1H5V6zM5 9h10v1H5V9zM1 12h14v1H1v-1zM1 5v6l3-3-3-3z"/>
    </svg>
  );
}

export function Outdent({ className = '', size = 16 }: RichTextEditorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M1 3h14v1H1V3zM5 6h10v1H5V6zM5 9h10v1H5V9zM1 12h14v1H1v-1zM4 5v6l-3-3 3-3z"/>
    </svg>
  );
}