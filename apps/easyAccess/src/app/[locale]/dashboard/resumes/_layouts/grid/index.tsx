
import { AnimatePresence, motion } from "framer-motion";
import { BaseCard } from "./_components/base-card";
import { ResumeCard } from "./_components/resume-card";
import Image from "next/image";
import useResumes from "apps/easyAccess/src/hooks/useResumes";

export const GridView = () => {
  const {resumes, loading} = useResumes()

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseCard >
              <div className="space-y-3 w-full">
                <div className="overflow-hidden rounded-md">
                  <Image width="250" height="330" className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                    src="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75"
                    style={{ color: 'transparent' }} alt="img" />
                </div>
                <div className="space-y-1 text-sm"><h3 className="font-medium leading-none">React Rendezvous</h3><p className="text-xs text-muted-foreground">
                  Ethan Byte
                </p>
                </div>
              </div>
            </BaseCard>
          </div>
        ))}

      {resumes && (
        <AnimatePresence>
          {resumes
            .map((resume, index) => (
              <motion.div
                key={resume.builderId}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <ResumeCard resume={resume} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
