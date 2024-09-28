'use client'
import { ResumeData } from "apps/easyAccess/libs/schema";
import { useArtboardStore } from "apps/easyAccess/src/store/artboard";
import { useEffect, PropsWithChildren } from "react";

interface NotIframeProvidersProps extends PropsWithChildren {
    resume: ResumeData
}

export const NotIframeProviders = ({ resume: _resume, children }: NotIframeProvidersProps) => {
    const resume = useArtboardStore((state) => state.resume);
    const setResume = useArtboardStore((state) => state.setResume);

    useEffect(() => {
        console.log('NotIframeProviders', _resume);
        _resume && setResume(_resume)
    }, [_resume]);

    return <>{resume && children}</>;
};
