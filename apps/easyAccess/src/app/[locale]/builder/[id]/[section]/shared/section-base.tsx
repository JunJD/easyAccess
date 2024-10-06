
import { SectionItem, SectionKey, SectionWithItem } from "apps/easyAccess/libs/schema";
import { AnimatePresence, motion } from "framer-motion";
import { getSectionIcon } from "./section-icon";
import { Button } from "apps/easyAccess/libs/ui/Button";
import { createId } from "@paralleldrive/cuid2";
import { Plus, CopySimple, Eye, EyeSlash, PencilSimple, TrashSimple } from '@phosphor-icons/react';
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { curry, get } from "lodash-es";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import DraggableList, { Item } from "../_component/DraggableList";
import { useCallback, useMemo } from "react";
import { Tooltip } from "apps/easyAccess/libs/ui/tooltip";
import useMouseHoverState from "apps/easyAccess/src/hooks/useMouseHoverState";

interface ContentProps {
    icons: React.ReactNode[],
    title: string,
    description: string
}

const Content = (props: ContentProps) => {
    const { icons, title, description } = props;
    const {
        isHovering,
        handleMouseEnter,
        handleMouseLeave
    } = useMouseHoverState()
    return (
        <div className="flex items-center justify-between"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="cursor-pointer p-3 hover:bg-secondary/20 active:bg-secondary/40 transition-colors duration-100"
                style={{ width: `calc(100% - 36px * ${isHovering ? icons.length : 0})`, transition: `width 0.5s ease-in-out` }}
            >
                <Tooltip content={title}>
                    <h4 className="font-medium leading-tight truncate">{title}</h4>
                </Tooltip>
                <Tooltip content={description}>
                    <p className="text-xs leading-snug text-muted-foreground mt-0.5 truncate h-[16.5px]">
                        {description}
                    </p>
                </Tooltip>
            </div>
            <AnimatePresence>
                {isHovering && (
                    icons.map((icon, index) => (
                        <motion.div
                            className="h-8 w-8 flex items-center justify-center bg-background mr-1"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut", delay: index * 0.1 }}
                            key={index}
                        >
                            {icon}
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    )
}

type Props<T extends SectionItem> = {
    sectionKey: SectionKey;
    getTitle: (item: T) => string;
    getDescription?: (item: T) => string | undefined;
    open: (type: "create" | "update", params: { item?: T }) => void;
};

export const SectionBase = <T extends SectionItem>({ sectionKey, getTitle, getDescription, open }: Props<T>) => {
    const params = useParams()
    const t = useTranslations("builder.section");
    const setValue = useResumeStore((state) => curry(state.setResumeValue))(params.id as string);


    const section = useResumeStore((state) => {
        return get(state.activeResumeData.sections, sectionKey)
    }) as SectionWithItem<T>;

    const onCreate = () => {
        open("create", {});
    };


    const renderIcons = useCallback((item: T) => {
        return [
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { handleToggleVisibility(item) }}>
                {item.visible ? <Eye size={14} /> : <EyeSlash size={14} />}
            </Button>,
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { handleEdit(item) }}>
                <PencilSimple size={14} />
            </Button>,
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { handleDuplicate(item) }}>
                <CopySimple size={14} />
            </Button>,
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { handleDelete(item) }}>
                <TrashSimple size={14} />
            </Button>
        ]
    }, [section])

    const handleToggleVisibility = (item: T) => {

    }

    const handleEdit = (item: T) => {
        open("update", { item });
    }

    const handleDuplicate = (items: T) => {
        const duplicateItem = { ...items, id: createId() };
        setValue(`sections.${sectionKey}.items`, [...section.items, duplicateItem]);
    }

    const handleDelete = (item: T) => {
        const filterList = section.items.filter((i) => {
            return i.id !== item.id
        });
        setValue(`sections.${sectionKey}.items`, filterList);
    }


    const onItemsChange = (items: Item[]) => {
        const sortedItems = items.map((item) => {
            return section.items.find(i => i.id === item.id)
        })
        setValue(`sections.${sectionKey}.items`, sortedItems);
    }

    const data: Item[] = useMemo(() => {
        return section.items.map((item) => {
            const title = getTitle(item as T);
            const description = getDescription?.(item as T) ?? 'description';
            const icons = renderIcons(item as T)

            return {
                id: item.id,
                content: <Content title={title} description={description} icons={icons} />
            }
        })
    }, [section])

    return (
        <motion.section
            id={sectionKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-y-6 w-full flex-col"
        >
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    {getSectionIcon(sectionKey)}
                    <h2 className="line-clamp-1 text-3xl font-bold">{section.name}</h2>
                </div>
            </header>


            <main className="flex flex-col w-full gap-4">
                <DraggableList
                    data={data} onItemsChange={onItemsChange}
                >
                </DraggableList>
            </main>
            <footer className="flex items-center justify-end">
                <Button variant="outline" className="ml-auto gap-x-2" onClick={onCreate}>
                    <Plus />
                    <span>
                        {t('add')}
                    </span>
                </Button>
            </footer>
        </motion.section>
    )
}