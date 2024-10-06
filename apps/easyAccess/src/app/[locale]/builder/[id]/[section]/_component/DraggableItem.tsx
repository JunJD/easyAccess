'use client'


import React, { useEffect, useRef, useState } from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from '@easy-access/utils'
import { HandGrabbing } from '@phosphor-icons/react'
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuTrigger } from 'apps/easyAccess/libs/ui/context-menu'
import { Tooltip } from 'apps/easyAccess/libs/ui/tooltip'
import useMouseHoverState from 'apps/easyAccess/src/hooks/useMouseHoverState'
export interface HoverSqueezeItemProps {
    id: string
    children: React.ReactNode
}

export function DraggableItem({
    id,
    children,
}: HoverSqueezeItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })

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

    const {
        isHovering,
        handleMouseEnter,
        handleMouseLeave
    } = useMouseHoverState()

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
                    <HandGrabbing weight="bold" size={14} />
                </div>

                <div
                    className="flex-1 cursor-pointer p-3 hover:bg-secondary/20 active:bg-secondary/40 transition-colors duration-100 overflow-hidden"
                    style={{ width: contentWidth }}
                >
                    <div
                        className="truncate"
                        ref={contentRef}
                    >
                        {children}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}