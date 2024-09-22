
import { create } from "zustand";
import { ResumeDataType } from "apps/easyAccess/src/types/resume/resume-data";

export type ArtboardStore = {
    resume: ResumeDataType;
    setResume: (resume: ResumeDataType) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
    resume: null as unknown as ResumeDataType,
    setResume: (resume) => {
        set({ resume });
    },
}));
