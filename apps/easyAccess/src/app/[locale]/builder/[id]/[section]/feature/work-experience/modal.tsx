import { Modal } from "rc-modal-sheet"
import NiceModal, { useModal } from '@ebay/nice-modal-react';

interface ModalProps {
    name: string;
}

export default NiceModal.create(({ name }: ModalProps) => {
    // Use a hook to manage the modal state
    const modal = useModal();
    const handleOpenChange = (open: boolean) => {
        console.log('open', open)
        if (open) {
            modal.show();
        } else {
            modal.hide();
        }
    }

    return (
        <Modal title="A declaratively modal" open={modal.visible} onOpenChange={handleOpenChange}>
            <p>
                This is a modal. You can put anything you want in here. And It can be
                nested.
            </p>


            <del>{name}</del>
        </Modal>
    );
});