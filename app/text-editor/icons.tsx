import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

export function BoldIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M4 2h4.5a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-1.5 2.29v.42A2.5 2.5 0 0 1 8.5 10.5v1A2.5 2.5 0 0 1 6 14H4V2zm1.5 5.5h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3v3zm0 5h2.5a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-2.5v3z"/>
    </svg>
  );
}

export function ItalicIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M6 2h6v1.5H9.5L7.5 12H10v1.5H4V12h2.5L8.5 3.5H6V2z"/>
    </svg>
  );
}

export function UnderlineIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 12a4 4 0 0 0 4-4V2h-1.5v6a2.5 2.5 0 0 1-5 0V2H4v6a4 4 0 0 0 4 4zm-6 2h12v1H2v-1z"/>
    </svg>
  );
}

export function ListOrderedIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 2.5h1v2H2v.5h2V4H3V3h1V2H2v.5zm0 5h1v1H2v.5h2V8H3V7.5h1V7H2v.5zm0 5h1v.5H2v.5h2v-1H3v-.5h1v-.5H2V12z"/>
      <path d="M5.5 3.5h8v1h-8v-1zm0 4h8v1h-8v-1zm0 4h8v1h-8v-1z"/>
    </svg>
  );
}

export function ListUnorderedIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <circle cx="2.5" cy="4" r="1"/>
      <circle cx="2.5" cy="8" r="1"/>
      <circle cx="2.5" cy="12" r="1"/>
      <path d="M5.5 3.5h8v1h-8v-1zm0 4h8v1h-8v-1zm0 4h8v1h-8v-1z"/>
    </svg>
  );
}

export function ImageIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3zm1.5.5v9h9V9.5l-2.5-2.5-3 3-1.5-1.5-2 2v-6zm2.5 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
    </svg>
  );
}

export function HorizontalRuleIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 8h12v1H2V8z"/>
    </svg>
  );
}

export function MentionIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5 5.5a3 3 0 1 1 5.898.65 1.5 1.5 0 0 1-2.398 1.2A1.5 1.5 0 0 1 6 8.5V5.5z"/>
    </svg>
  );
}

export function HashtagIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M6.5 2L6 5H3v1h2.8l-.5 3H2v1h3.1l-.4 2.5h1l.4-2.5h3l-.4 2.5h1L10.1 10H13V9h-3.1l.5-3H14V5h-3.6l.4-2.5h-1L9.4 5h-3l.4-2.5h-1zm-.1 4h3l-.5 3h-3l.5-3z"/>
    </svg>
  );
}

export function HeaderIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 2h1.5v5H7V2h1.5v12H7v-5H3.5v5H2V2zm8 8h4v1.5h-4V10z"/>
    </svg>
  );
}