
import { LocaleMode, ThemeMode } from './locale';



export interface GlobalBaseSettings {
  fontSize: number;
  language: LocaleMode;
  password: string;
  themeMode: ThemeMode;
}

export type GlobalSettings = GlobalBaseSettings