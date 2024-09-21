export const templatesList = [
  "design",
] as const;

export type Template = (typeof templatesList)[number];
