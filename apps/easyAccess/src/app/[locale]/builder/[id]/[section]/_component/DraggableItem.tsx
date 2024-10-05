'use client'


import React, { useEffect, useRef, useState } from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from '@easy-access/utils'
import { DotsSix } from '@phosphor-icons/react'
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuTrigger } from 'apps/easyAccess/libs/ui/context-menu'
import { Tooltip } from 'apps/easyAccess/libs/ui/tooltip'
export interface HoverSqueezeItemProps {
    id: string
    children: React.ReactNode
    renderIcons?: React.ReactNode[]
}

export function DraggableItem({
    id,
    children,
    renderIcons = [],
}: HoverSqueezeItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })

    const [isHovered, setIsHovered] = useState(false)
    const [contentWidth, setContentWidth] = useState('100%')
    const contentRef = useRef<HTMLDivElement>(null)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    useEffect(() => {
        if (contentRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setContentWidth(`${entry.contentRect.width}px`)
                }
            })

            observer.observe(contentRef.current)

            return () => {
                observer.disconnect()
            }
        }
    }, [])

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                    "flex items-center border-b bg-background last:rounded-b cursor-move",
                )}
            >
                <div
                    {...listeners}
                    {...attributes}
                    className="flex w-8 cursor-move items-center justify-center self-stretch hover:bg-secondary shrink-0"
                >
                    <DotsSix weight="bold" size={14} />
                </div>

                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <motion.div
                            className="flex-1 cursor-pointer p-3 hover:bg-secondary/20 active:bg-secondary/40 transition-colors duration-100 overflow-hidden"
                            style={{ width: contentWidth }}
                            layout
                        >
                            <motion.div
                                className="truncate"
                                layout
                                ref={contentRef}
                            >
                                {children}
                            </motion.div>
                        </motion.div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        {renderIcons.map((icon, index) => (
                            <ContextMenuCheckboxItem key={index}>
                                {icon}
                            </ContextMenuCheckboxItem>
                        ))}
                    </ContextMenuContent>
                </ContextMenu>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="flex items-center shrink-0"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {renderIcons.map((icon, index) => (
                                <div key={index} className="h-8 w-8 flex items-center justify-center">
                                    {icon}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}