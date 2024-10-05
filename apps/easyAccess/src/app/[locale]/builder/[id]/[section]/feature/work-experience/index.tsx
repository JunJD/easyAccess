import NiceModal from '@ebay/nice-modal-react/lib/esm';
import { SectionBase } from "../../shared/section-base";
import Modal from './modal'
import { experienceSchema } from 'apps/easyAccess/libs/schema';
import { z } from 'zod';
// Type
export type Experience = z.infer<typeof experienceSchema>;
const Experience = () => {
    // (type: "create" | "update" | "duplicate", params: { sectionKey: string; item?: T }) => void;
    const onOpen = (type: "create" | "update" | "duplicate", params: { sectionKey: string; item?: any }) => {
        if (type === 'create') {
            NiceModal.show(Modal, { isEdit: false })
        }
        console.log('type==>', type)
    }

    return (
        <SectionBase<Experience>
            open={onOpen}
            sectionKey='experience'
            getTitle={(item) => item.company}
            getDescription={(item) => item.position}
        />
    )
}

export default Experience