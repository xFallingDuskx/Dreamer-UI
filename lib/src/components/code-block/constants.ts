import { BashTokenClasses, JsonTokenClasses, TSTokenClasses } from './types';

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

export const defaultJsonTokenClasses: JsonTokenClasses = {
  key: 'text-purple-400 font-semibold',
  string: 'text-green-400',
  number: 'text-orange-400 font-medium',
  boolean: 'text-cyan-400 font-medium',
  punctuation: 'text-gray-400',
  plain: 'text-gray-100',
};

export const defaultBashTokenClasses: BashTokenClasses = {
  keyword: 'text-rose-400',
  comment: 'text-gray-400/80',
  command: 'text-gray-100',
  variable: 'text-cyan-400',
  string: 'text-yellow-400',
  option: 'text-purple-400',
  plain: 'text-gray-100',
  operator: 'text-pink-400',
  substitution: 'text-green-400',
};
