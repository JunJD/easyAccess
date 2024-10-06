'use client'
import { createId } from "@paralleldrive/cuid2"
import { ResumeData, Section, SectionItem, SectionWithItem, Sections } from "apps/easyAccess/libs/schema"
import { useResumeStore } from "apps/easyAccess/src/store/resume/store"
import { produce } from "immer"
import { curry, get } from "lodash-es"
import { useEffect } from "react"

const useBuilder = (id: string) => {

    const setActiveBuilderDataById = useResumeStore(state => state.setActiveBuilderDataById)
    const builderData: ResumeData = useResumeStore(state => state.activeResumeData)
    useEffect(() => {
        setActiveBuilderDataById(id)
    }, [id])

    return builderData
}

export default useBuilder

const useBuilderWithSection = <T extends Sections[keyof Sections]>(builderId: string, sectionKey: string) => {
    const setValue = useResumeStore((state) => curry(state.setResumeValue))(builderId);
    const section = useResumeStore((state) => {
        return get(state.activeResumeData.sections, sectionKey);
    }) as T | null;

    const addSectionItem = (value: SectionItem) => {
        setValue(
            `sections.${sectionKey}.items`,
            produce((section as SectionWithItem).items, (draft: SectionItem[]): void => {
                const createItem = { ...value, id: createId() };
                draft.push(createItem);
            }),
        );
    }
    const updateSectionItem = (value: SectionItem) => {
        const index = (section as SectionWithItem).items.findIndex((item) => item.id === value.id);
        setValue(
            `sections.${sectionKey}.items.${index}`,
            value,
        );
    }
    return {
        section,
        addSectionItem,
        updateSectionItem
    }
}

export {
    useBuilderWithSection
}