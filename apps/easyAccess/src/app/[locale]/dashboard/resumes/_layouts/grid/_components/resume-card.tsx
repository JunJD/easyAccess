
import {
  CircleNotch,
  CopySimple,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
// import { ResumeDto } from "@reactive-resume/dto";

import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";


// import { useResumePreview } from "@/client/services/resume/preview";
// import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "apps/easyAccess/libs/ui/context-menu";
import { cn } from "@easy-access/utils";
import { useRouter } from "apps/easyAccess/src/navigation";
import { ResumeType } from "apps/easyAccess/src/types/resume/resumes";

type Props = {
  resume: ResumeType
  // resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  const router = useRouter()
  // const { open } = useDialog<ResumeDto>("resume");
  // const { open: lockOpen } = useDialog<ResumeDto>("lock");

  // const { url, loading } = useResumePreview(resume.id);
  const loading = false
  const url = `https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75`

  const onOpen = () => {
    router.push(`/builder/${resume.id}`);
  };

  const onUpdate = () => {
    // open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    // open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    // lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
    // open("delete", { id: "resume", item: resume });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <BaseCard className="space-y-0" onClick={onOpen}>
          <AnimatePresence presenceAffectsLayout>

            <div className="space-y-3 w-full">
              <div className="overflow-hidden rounded-sm align-middle flex items-center justify-center">
                {loading && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CircleNotch
                      size={64}
                      weight="thin"
                      opacity={0.5}
                      className="animate-spin self-center justify-self-center"
                    />
                  </motion.div>
                )}

                {!loading && url && (
                  <motion.img
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    loading="lazy"
                    alt={resume.title}
                    className="size-full h-auto w-auto object-cover transition-all hover:scale-105 "
                    src={`${url}`}
                  />
                )}
              </div>
            </div>
          </AnimatePresence>

          <AnimatePresence>
            {resume.locked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm"
              >
                <Lock size={42} />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
              "bg-gradient-to-t from-background/80 to-transparent text-foreground",
            )}
          >
            <h4 className="line-clamp-2 font-medium">{resume.title}</h4>
            <p className="line-clamp-1 text-xs opacity-75">{`Last updated ${resume.updatedAt}`}</p>
          </div>
        </BaseCard>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={onOpen}>
          <FolderOpen size={14} className="mr-2" />
          'Open'打开
        </ContextMenuItem>
        <ContextMenuItem onClick={onUpdate}>
          <PencilSimple size={14} className="mr-2" />
          'Rename'重命名
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}>
          <CopySimple size={14} className="mr-2" />
          'Duplicate'复制
        </ContextMenuItem>
        {resume.locked ? (
          <ContextMenuItem onClick={onLockChange}>
            <LockOpen size={14} className="mr-2" />
            'Unlock'解锁
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={onLockChange}>
            <Lock size={14} className="mr-2" />
            'Lock'锁住
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive" onClick={onDelete}>
          <TrashSimple size={14} className="mr-2" />
          'Delete'删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
