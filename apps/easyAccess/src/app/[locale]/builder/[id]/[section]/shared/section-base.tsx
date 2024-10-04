import { SectionItem, SectionKey, SectionWithItem } from "apps/easyAccess/libs/schema";
import { AnimatePresence, motion } from "framer-motion";
import { getSectionIcon } from "./section-icon";
import { Button } from "apps/easyAccess/libs/ui/Button";
import { Plus } from "@phosphor-icons/react";

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SectionListItem } from "../_component/sectionListItem";
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { curry, get } from "lodash-es";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
type Props<T extends SectionItem> = {
    sectionKey: SectionKey;
    title: (item: T) => string;
    description?: (item: T) => string | undefined;
    open: (type: "create" | "update" | "duplicate", params: { sectionKey: string; item?: T }) => void;
};

export const SectionBase = <T extends SectionItem>({ sectionKey, title, description, open }: Props<T>) => {
    const params = useParams()
    const t = useTranslations("builder.section");
    const setValue = useResumeStore((state) => curry(state.setResumeValue))(params.id as string);

    const section = useResumeStore((state) => {
        return get(state.activeResumeData.sections, sectionKey)
    }) as SectionWithItem<T>;


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!section) return null;

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = section.items.findIndex((item) => item.id === active.id);
            const newIndex = section.items.findIndex((item) => item.id === over.id);

            const sortedList = arrayMove(section.items as T[], oldIndex, newIndex);
            setValue(`sections.${sectionKey}.items`, sortedList);
        }
    };


    const onCreate = () => {
        open("create", { sectionKey });
    };
    const onUpdate = (item: T) => {
        // open("update", { id, item });
    };
    const onDuplicate = (item: T) => {
        // open("duplicate", { id, item });
    };
    const onDelete = (item: T) => {
        // open("delete", { id, item });
    };
    const onToggleVisibility = (index: number) => {
        const visible = get(section, `items[${index}].visible`, true);
        setValue(`sections.${sectionKey}.items[${index}].visible`, !visible);
    };

    return (
        <motion.section
            id={sectionKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-y-6"
        >
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    {getSectionIcon(sectionKey)}

                    <h2 className="line-clamp-1 text-3xl font-bold">{section.name}</h2>
                </div>

                {/* <div className="flex items-center gap-x-2">
          <SectionOptions id={id} />
        </div> */}
            </header>

            <main className="grid gap-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToParentElement]}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext items={section.items} strategy={verticalListSortingStrategy}>
                        <AnimatePresence>
                            {section.items.map((item, index) => (
                                <SectionListItem
                                    sectionId={sectionKey as string}
                                    item={item}
                                    key={item.id}
                                    id={item.id}
                                    visible={item.visible}
                                    title={title(item as T)}
                                    description={description?.(item as T)}
                                    onUpdate={() => {
                                        onUpdate(item as T);
                                    }}
                                    onDelete={() => {
                                        onDelete(item as T);
                                    }}
                                    onDuplicate={() => {
                                        onDuplicate(item as T);
                                    }}
                                    onToggleVisibility={() => {
                                        onToggleVisibility(index);
                                    }}
                                />
                            ))}
                        </AnimatePresence>
                    </SortableContext>
                </DndContext>
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