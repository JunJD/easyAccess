'use client'
import { SectionItem, SectionKey, SectionWithItem } from "apps/easyAccess/libs/schema";
import { createId } from "@paralleldrive/cuid2";
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
import { produce } from "immer";
// import { produce } from "immer";
import { curry, get } from "lodash-es";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const setValue = useResumeStore((state) => curry(state.setResumeValue))(params.id as string);
  const section = useResumeStore((state) => {
    return get(state.activeResumeData.sections, sectionKey);
  }) as SectionWithItem<T> | null;


  const onSubmit = (values: T) => {
    console.log(values, 'onSubmit', createId())
    if (!section) return;
    setValue(
      `sections.${sectionKey}.items`,
      produce(section.items, (draft: T[]): void => {
        draft.push({ ...values, id: createId() });
      }),
    );
    onOpenChange(false)
  };

  const onError = (errors: any) => {
    console.log('onError', createId())
    console.log(errors, 'onError')
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="z-50">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit, onError)}>
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
