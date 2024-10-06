import { Modal } from "rc-modal-sheet"
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import FormRender from "apps/easyAccess/libs/simpleForm";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { SectionItem, SectionWithItem } from "apps/easyAccess/libs/schema";
import { Button } from "apps/easyAccess/libs/ui";
import { FormSchema } from "./formSchema";

export interface ModalProps<T extends FieldValues> {
    isEdit?: boolean;
    form: UseFormReturn<T>,
    formSchema: FormSchema[],
    title?: string;
}

const ModalContent = <T extends SectionItem>({ title, isEdit, form, formSchema }: ModalProps<T>) => {
    const modal = useModal();
    const handleOpenChange = (open: boolean) => {
        open ? modal.show() : modal.hide();
    }

    const onSubmit = (values: T) => {
        modal.resolve(values);
        form.reset();
        modal.hide();
    };

    return (
        <Modal title={title ?? 'modal title'} modalClassName="bg-white" open={modal.visible} onOpenChange={handleOpenChange}>
            <FormRender form={form} schema={formSchema} />
            <div className="flex justify-end gap-2 mt-4">
                <Button variant='ghost' onClick={() => {
                    modal.hide()
                    modal.reject(new Error('cancel'))
                }}>取消</Button>
                <Button onClick={form.handleSubmit(onSubmit)}>保存</Button>
            </div>
        </Modal>
    );
}

export default NiceModal.create(ModalContent);