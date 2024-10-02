/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}


declare module 'highlight.js' {
  export function getLanguage(lang: string): boolean;
  export function highlight(code: string, { language: string }): any;
}