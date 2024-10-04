import NiceModal from '@ebay/nice-modal-react/lib/esm';
import { SectionBase } from "../../shared/section-base";
import Modal from './modal'
const Experience = () => {
    // (type: "create" | "update" | "duplicate", params: { sectionKey: string; item?: T }) => void;
    const onOpen = (type: "create" | "update" | "duplicate", params: { sectionKey: string; item?: any }) => {
        if (type === 'create') {
            NiceModal.show(Modal, { isEdit: false })
        }
        console.log('type==>', type)
    }
    return (
        <SectionBase
            open={onOpen}
            sectionKey='experience'
            title={() => '工作经历'}
            description={() => '添加你的工作经历'}
        />
    )
}

export default Experience