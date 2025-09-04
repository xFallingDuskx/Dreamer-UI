import { BashTokenClasses, CSSTokenClasses, JsonTokenClasses, TSTokenClasses } from './types';

export const defaultBashTokenClasses: BashTokenClasses = {
  keyword: 'text-rose-400',
  runner: 'text-amber-400',
  comment: 'text-gray-500/80',
  command: 'text-gray-100',
  variable: 'text-blue-400',
  string: 'text-white/70',
  option: 'text-purple-400',
  plain: 'text-gray-200',
  operator: 'text-pink-500',
  substitution: 'text-green-300',
};

export const defaultCSSTokenClasses: CSSTokenClasses = {
  selector: 'text-blue-400 font-medium',
  property: 'text-purple-400',
  value: 'text-green-400',
  punctuation: 'text-gray-400',
  atRule: 'text-pink-400 font-semibold',
  comment: 'text-gray-500 italic',
  string: 'text-green-400',
  number: 'text-green-400',
  plain: 'text-gray-100',
  function: 'text-cyan-400',
};

export const defaultJsonTokenClasses: JsonTokenClasses = {
  key: 'text-purple-400 font-semibold',
  string: 'text-green-400',
  number: 'text-orange-400 font-medium',
  boolean: 'text-cyan-400 font-medium',
  punctuation: 'text-gray-400',
  plain: 'text-gray-100',
};

export const defaultTSTokenClasses: TSTokenClasses = {
  keyword: 'text-purple-400 font-semibold',
  type: 'text-cyan-400 font-medium',
  string: 'text-green-400',
  'jsx-bracket': 'text-gray-400',
  'jsx-tag': 'text-blue-400 font-medium',
  'jsx-attribute': 'text-amber-400',
  'jsx-brace': 'text-yellow-400',
  jsx: 'text-blue-400 font-medium', // fallback for old jsx type
  property: 'text-amber-400',
  number: 'text-orange-400 font-medium',
  comment: 'text-gray-500 italic',
  function: 'text-rose-400 font-semibold',
  hook: 'text-rose-400 font-semibold',
  operator: 'text-gray-300',
  plain: 'text-gray-100',
};
