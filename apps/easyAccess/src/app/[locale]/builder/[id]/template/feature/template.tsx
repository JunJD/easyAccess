
'use client'
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { motion } from "framer-motion";

import { cn, templatesList } from "@easy-access/utils";
import { AspectRatio } from "apps/easyAccess/libs/ui/aspect-ratio";
import { curry } from "lodash-es";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";


export const TemplateSection = () => {
  const t = useTranslations("builder.templateLayout")
  const params = useParams();
  const setValue = useResumeStore((state) => curry(state.setResumeValue)(params.id as string));
  const currentTemplate = useResumeStore((state) => state.activeResumeData.metadata.template);

  return (
    <section id="template" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {/* {getSectionIcon('basics')} */}
          <h2 className="line-clamp-1 text-3xl font-bold">{t('header')}</h2>
        </div>
      </header>

      <main className="grid grid-cols-2 gap-5 @lg/right:grid-cols-3 @2xl/right:grid-cols-4">
        {templatesList.map((template, index) => (
          <AspectRatio key={template} ratio={1 / 1.4142}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: index * 0.1 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              className={cn(
                "relative cursor-pointer rounded-sm ring-primary transition-all hover:ring-2",
                currentTemplate === template && "ring-2",
              )}
              onClick={() => {
                setValue("metadata.template", template);
              }}
            >
              <img src={`/templates/jpg/${template}.jpg`} alt={template} className="rounded-sm" />

              <div className="absolute inset-x-0 bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-background/80">
                <p className="absolute inset-x-0 bottom-2 text-center font-bold capitalize text-primary">
                  {template}
                </p>
              </div>
            </motion.div>
          </AspectRatio>
        ))}
      </main>
    </section>
  );
};
