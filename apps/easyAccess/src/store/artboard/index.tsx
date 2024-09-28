
import { ResumeData } from "apps/easyAccess/libs/schema";
import { create } from "zustand";


export type ArtboardStore = {
    resume: ResumeData;
    setResume: (resume: ResumeData) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
    resume: null as unknown as ResumeData,
    setResume: (resume) => {
        console.log("setResume", resume);
        set({ resume });
    },
}));
