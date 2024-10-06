'use client'
import React, { useCallback, useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { DraggableItem } from './DraggableItem';
export interface Item {
    id: string
    content: React.ReactNode
}

interface DraggableListProps {
    data: Item[]
    onItemsChange: (items: Item[]) => void
}

export default function DraggableList(props: DraggableListProps) {

    const { data, onItemsChange } = props;
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems(data);
    }, [data])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            console.log("active", active.id);
            const activeIndex = items.findIndex((i) => i.id === active.id);
            const overIndex = items.findIndex((i) => i.id === over?.id);
            const newlist = arrayMove(items, activeIndex, overIndex);
            setItems(newlist);
            onItemsChange(newlist);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map(item => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map(item => (
                    <DraggableItem key={item.id} id={item.id}>
                        {item.content}
                    </DraggableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
}