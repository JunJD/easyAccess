import { isEqual } from 'lodash-es';
import type { StateCreator } from 'zustand/vanilla';
import { ThemeMode } from "apps/easyAccess/src/types/locale";
import { GlobalStore } from '../../store';
import { DeepPartial } from 'utility-types';
import { GlobalSettings } from 'apps/easyAccess/src/types/settings';
import { difference, funLog, merge } from '@easy-access/utils';
/**
 * 设置操作
 */
export interface SettingsAction {
  switchThemeMode: (themeMode: ThemeMode) => Promise<void>;
  setSettings: (settings: DeepPartial<GlobalSettings>) => Promise<void>;
}

export const createSettingsSlice: StateCreator<
  GlobalStore,
  [['zustand/devtools', never]],
  [],
  SettingsAction
> = (set, get) => ({
  switchThemeMode: async (themeMode = 'dark') => {
    funLog('log', async () => { await get().setSettings({ themeMode }); })
  },
  setSettings: async (settings) => {
    const { settings: prevSetting, defaultSettings } = get();

    const nextSettings = merge(prevSetting, settings);

    if (isEqual(prevSetting, nextSettings)) return;

    const diffs = difference(nextSettings, defaultSettings);
    funLog('diffs', () => diffs)

    set({ settings: nextSettings });

    // await userService.updateUserSettings(diffs);
    // await get().refreshUserConfig();
  },
});
