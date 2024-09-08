import { ResumesState, initialResumeState } from './slices/resumes/initialState';

export type ResumeState = ResumesState;

export const initialState: ResumeState = {
    ...initialResumeState,
};
