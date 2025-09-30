export interface BashTokenClasses {
  keyword?: string;
  runner?: string;
  comment?: string;
  command?: string;
  variable?: string;
  string?: string;
  option?: string;
  plain?: string;
  operator?: string;
  substitution?: string;
}
export type BashTokenType = keyof BashTokenClasses;

export interface CSSTokenClasses {
  selector?: string;
  property?: string;
  value?: string;
  punctuation?: string;
  atRule?: string;
  comment?: string;
  string?: string;
  number?: string;
  plain?: string;
  function?: string;
}
export type CSSTokenType = keyof CSSTokenClasses;

export interface JsonTokenClasses {
  key?: string;
  string?: string;
  number?: string;
  boolean?: string;
  punctuation?: string;
  plain?: string;
}
export type JsonTokenType = keyof JsonTokenClasses;

export interface MarkdownTokenClasses {
  heading?: string;
  'heading-hash'?: string;
  bold?: string;
  italic?: string;
  'bold-marker'?: string;
  'italic-marker'?: string;
  link?: string;
  'link-text'?: string;
  'link-url'?: string;
  'link-bracket'?: string;
  'link-paren'?: string;
  code?: string;
  'code-marker'?: string;
  'code-block'?: string;
  'code-block-marker'?: string;
  'list-marker'?: string;
  'list-item'?: string;
  blockquote?: string;
  'blockquote-marker'?: string;
  plain?: string;
}
export type MarkdownTokenType = keyof MarkdownTokenClasses;

export interface TSTokenClasses {
  keyword?: string;
  type?: string;
  string?: string;
  'jsx-bracket'?: string;
  'jsx-tag'?: string;
  'jsx-attribute'?: string;
  'jsx-brace'?: string;
  jsx?: string;
  property?: string;
  number?: string;
  comment?: string;
  function?: string;
  hook?: string;
  operator?: string;
  plain?: string;
}
export type TSTokenType = keyof TSTokenClasses;

export type TokenClasses = TSTokenClasses | JsonTokenClasses | BashTokenClasses | CSSTokenClasses | MarkdownTokenClasses;
