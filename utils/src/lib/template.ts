export const templatesList = [
  "design",
  "azurill"
] as const;

export type Template = (typeof templatesList)[number];
