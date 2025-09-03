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

export interface JsonTokenClasses {
  key?: string;
  string?: string;
  number?: string;
  boolean?: string;
  punctuation?: string;
  plain?: string;
}
export type JsonTokenType = keyof JsonTokenClasses;

export interface BashTokenClasses {
  comment?: string;
  command?: string;
  variable?: string;
  string?: string;
  option?: string;
  plain?: string;
}
export type BashTokenType = keyof BashTokenClasses;

export type TokenClasses = TSTokenClasses | JsonTokenClasses | BashTokenClasses;
