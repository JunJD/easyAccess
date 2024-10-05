'use client'

import React from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import { cn } from '@easy-access/utils'
import { DotsSix } from '@phosphor-icons/react'
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuTrigger } from 'apps/easyAccess/libs/ui/context-menu'

export interface DraggableItemProps {
    id: string
    children: React.ReactNode
    renderIcons?: React.ReactNode[]
}

export function DraggableItem({
    id,
    children,
    renderIcons = [],
}: DraggableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}>
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                    "group flex items-center border-b bg-background last:rounded-b cursor-move",
                )}
            >
                <div
                    {...listeners}
                    {...attributes}
                    className="flex w-8 cursor-move items-center justify-center self-stretch hover:bg-secondary"
                >
                    <DotsSix weight="bold" size={14} />
                </div>

                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <div
                            className="flex-1 cursor-pointer p-3 hover:bg-secondary/20 active:bg-secondary/40 transition-colors duration-100"
                        >
                            {children}
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        {renderIcons.map((icon, index) => (
                            <ContextMenuCheckboxItem>
                                {icon}
                            </ContextMenuCheckboxItem>
                        ))}

                    </ContextMenuContent>
                </ContextMenu>


                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {renderIcons.map((icon, index) => (
                        <div key={index} className="h-8 w-8 flex items-center justify-center">
                            {icon}
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    )
}