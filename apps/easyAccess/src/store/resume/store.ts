import { PersistOptions, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { ResumeState, initialState } from "./initialState";
import { ResumesAction, createResumesSlice } from "./slices/resumes/action";
import { create } from 'zustand';
const createStore: StateCreator<Store, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...createResumesSlice(...parameters),
});

export type Store = ResumeState & ResumesAction;

//  ===============  实装 useStore ============ //
export const useResumeStore = create(
    devtools(createStore, {
        name: 'EASY_ACCESS_RESUME' + '_DEV'
    })
)