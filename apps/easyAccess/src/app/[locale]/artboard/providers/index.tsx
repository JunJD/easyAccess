'use client'
import { useArtboardStore } from "apps/easyAccess/src/store/artboard";
import { useEffect, PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  const resume = useArtboardStore((state) => state.resume);
  const setResume = useArtboardStore((state) => state.setResume);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (event.origin !== window.location.origin) return;

      if (event.data.type === "SET_RESUME") {
        alert('event.data.payload' + event.data.payload)
        setResume(event.data.payload)
      };
      if (event.data.type === "SET_THEME") {
        event.data.payload === "dark"
          ? document.documentElement.classList.add("dark")
          : document.documentElement.classList.remove("dark");
      }
    };

    const resumeData = window.localStorage.getItem("resume");
    if (resumeData) {

      setResume(JSON.parse(resumeData));
      return;
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setResume]);

  useEffect(() => {
    alert('resume' + resume)
  }, [resume])

  return <>{resume && children}</>;
};
