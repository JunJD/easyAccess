'use client'
import { useArtboardStore } from "apps/easyAccess/src/store/artboard";
import { ResumeDataType } from "apps/easyAccess/src/types/resume/resume-data";
import { useEffect, PropsWithChildren } from "react";

interface NotIframeProvidersProps extends PropsWithChildren {
    resume: ResumeDataType
}

export const NotIframeProviders = ({ resume: _resume, children }: NotIframeProvidersProps) => {
    const resume = useArtboardStore((state) => state.resume);
    const setResume = useArtboardStore((state) => state.setResume);

    useEffect(() => {
        _resume && setResume(_resume)
    }, [_resume]);

    return <>{resume && children}</>;
};
