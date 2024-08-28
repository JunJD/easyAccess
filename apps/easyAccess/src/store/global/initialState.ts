import { GlobalSettingsState, initialSettingsState } from './slices/settings/initialState';

export type GlobalState = GlobalSettingsState;

export const initialState: GlobalState = {
    ...initialSettingsState,
};
