import { GlobalBaseSettings } from "../types/settings";

export const DEFAULT_BASE_SETTINGS: GlobalBaseSettings = {
  fontSize: 14,
  language: 'en',
  password: '',
  themeMode: 'light',
};

export const COOKIE_CACHE_DAYS = 30;

export type GlobalSettings = GlobalBaseSettings

export const DEFAULT_SETTINGS: GlobalSettings = {
  ...DEFAULT_BASE_SETTINGS,
};
