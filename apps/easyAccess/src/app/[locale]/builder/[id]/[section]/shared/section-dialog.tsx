import { SectionItem, SectionKey, SectionWithItem } from "apps/easyAccess/libs/schema";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
} from "apps/easyAccess/libs/ui";
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
// import { produce } from "immer";
import { get } from "lodash-es";

// import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";


type Props<T extends SectionItem> = {
  sectionKey: SectionKey;
  form: UseFormReturn<T>;
  defaultValues: T;
  pendingKeyword?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export const SectionDialog = <T extends SectionItem>({
  sectionKey,
  form,
  defaultValues,
  pendingKeyword,
  isOpen,
  onOpenChange,
  children,
}: Props<T>) => {
  // const { isOpen, mode, close, payload } = useDialog<T>(id);

  // const setValue = useResumeStore((state) => state.setResumeValue);
  const section = useResumeStore((state) => {
    return get(state.activeResumeData.sections, sectionKey);
  }) as SectionWithItem<T> | null;


  const onSubmit = (values: T) => {
    if (!section) return;
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="z-50">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                 
                  <h2>
                  Create a new item
                  </h2>
                </div>
              </DialogTitle>
            </DialogHeader>

            {children}

            <DialogFooter>
              <Button type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
