import { BuilderState, initialBuilderState } from './slices/builder/initialState';
import { ResumesState, initialResumeState } from './slices/resumes/initialState';

export type ResumeState = ResumesState & BuilderState;

export const initialState: ResumeState = {
    ...initialResumeState,
    ...initialBuilderState
};
