import { Modal } from "rc-modal-sheet"
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import FormRender from "apps/easyAccess/libs/simpleForm";
import { formSchema } from "./formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionWithItem, defaultExperience, experienceSchema } from "apps/easyAccess/libs/schema";
import { Button } from "apps/easyAccess/libs/ui";
import { useParams } from "next/navigation";
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { curry, get } from "lodash-es";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { produce } from "immer";

interface ModalProps {
    name: string;
}

type ExperienceValues = z.infer<typeof experienceSchema>;

export default NiceModal.create(({ name }: ModalProps) => {
    const modal = useModal();
    const handleOpenChange = (open: boolean) => {
        open ? modal.show() : modal.hide();
    }

    const params = useParams();
    const setValue = useResumeStore((state) => curry(state.setResumeValue))(params.id as string);
    const section = useResumeStore((state) => {
        return get(state.activeResumeData.sections, 'experience');
    }) as SectionWithItem<ExperienceValues> | null;


    const form = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues: { ...defaultExperience, id: createId() },
    });


    const onSubmit = (values: ExperienceValues) => {

        if (!section) return;
        setValue(
            `sections.experience.items`,
            produce(section.items, (draft: ExperienceValues[]): void => {
                draft.push({ ...values, id: createId() });
            }),
        );
        form.reset();
        modal.hide();
    };

    return (
        <Modal title="新增经历" modalClassName="bg-white" open={modal.visible} onOpenChange={handleOpenChange}>
            <FormRender form={form} schema={formSchema} />
            <div className="flex justify-end gap-2 mt-4">
                <Button variant='ghost' onClick={() => modal.hide()}>取消</Button>
                <Button onClick={form.handleSubmit(onSubmit)}>保存</Button>
            </div>
        </Modal>
    );
});