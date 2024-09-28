import { BuilderState, initialBuilderState } from './slices/builder/initialState';
// import { ResumesState, initialResumeState } from './slices/resumes/initialState';

export type ResumeState = BuilderState;

export const initialState: ResumeState = {
    ...initialBuilderState
};
