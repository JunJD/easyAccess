import NiceModal from '@ebay/nice-modal-react/lib/esm';
import { SectionBase } from "../../shared/section-base";
import Modal from './modal'
import { defaultExperience, experienceSchema } from 'apps/easyAccess/libs/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createId } from '@paralleldrive/cuid2';
import { formSchema } from "./formSchema";
import { useBuilderWithSection } from 'apps/easyAccess/src/hooks/useBuilder';
import { useParams } from 'next/navigation';
type ExperienceValues = z.infer<typeof experienceSchema>;
const Experience = () => {
    const sectionKey = 'experience';
    const params = useParams()

    const form = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues: { ...defaultExperience, id: createId() },
    });


    const {
        addSectionItem
    } = useBuilderWithSection(params.id as string, sectionKey)

    const onOpen = (type: "create" | "update" | "duplicate", params: { sectionKey: string; item?: any }) => {
        if (type === 'create') {
            NiceModal.show<Exclude<ExperienceValues, 'id'>, any, any>(Modal, { isEdit: false, form, formSchema }).then(res => {
                addSectionItem(res)
            })
        }
        console.log('type==>', type)
    }


    return (
        <SectionBase<ExperienceValues>
            open={onOpen}
            sectionKey={sectionKey}
            getTitle={(item) => item.company}
            getDescription={(item) => item.position}
        />
    )
}

export default Experience