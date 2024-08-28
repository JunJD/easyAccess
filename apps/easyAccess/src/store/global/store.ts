import { PersistOptions, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { GlobalState, initialState } from "./initialState";
import { SettingsAction, createSettingsSlice } from "./slices/settings/action";
import { create } from 'zustand';
const createStore: StateCreator<GlobalStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...createSettingsSlice(...parameters),
});

export type GlobalStore = GlobalState & SettingsAction;


//  ===============  实装 useStore ============ //
export const useGlobalStore = create(
    devtools(createStore, {
        name: 'LobeChat_Global' + '_DEV'
    })
)
// export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
//     persist(
//       subscribeWithSelector(
//         devtools(createStore, {
//           name: 'LobeChat_Global' + (isDev ? '_DEV' : ''),
//         }),
//       ),
//       persistOptions,
//     ),
//     shallow,
//   );