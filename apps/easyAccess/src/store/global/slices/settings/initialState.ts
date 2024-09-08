import { DeepPartial } from 'utility-types';


import { DEFAULT_SETTINGS, GlobalSettings } from 'apps/easyAccess/src/const/settings';


export interface GlobalSettingsState {
  avatar?: string;
  defaultSettings: GlobalSettings;
  settings: DeepPartial<GlobalSettings>;
  userId?: string;
}

export const initialSettingsState: GlobalSettingsState = {
  defaultSettings: DEFAULT_SETTINGS,
  settings: {
    ...DEFAULT_SETTINGS
  },
};
