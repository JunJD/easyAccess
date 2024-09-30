
import { ResumeData } from "apps/easyAccess/libs/schema";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

export type ArtboardStore = {
    resume: ResumeData;
    setResume: (resume: ResumeData) => void;
};

export const useArtboardStore = create<ArtboardStore>()(
    persist(
        (set) => ({
            resume: null as unknown as ResumeData,
            setResume: (resume) => {
                console.log("setResume", resume);
                set({ resume });
            },
        }),
        {
            name: "artboard-storage",
            skipHydration: true,
            serialize: JSON.stringify,
            deserialize: JSON.parse,
        }
    )
);
