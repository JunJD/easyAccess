'use client'

import React, { useState } from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CopySimple, DotsSixVertical, PencilSimple, TrashSimple, Eye, EyeSlash } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { Button } from "apps/easyAccess/libs/ui/Button"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "apps/easyAccess/libs/ui/context-menu"

import EditModal from "./editModal"
import { cn } from '@easy-access/utils'

export interface SectionListItemProps {
  id: string
  sectionId: string

  title: string;
  visible?: boolean;
  description?: string;
  
  item: any
  onUpdate: (sectionId: string, itemId: string, updatedItem: any) => void
  onDuplicate: () => void
  onDelete: () => void
  onToggleVisibility: () => void
}

export function SectionListItem({
  id,
  sectionId,
  title,
  item,
  onUpdate,
  onDuplicate,
  onDelete,
  onToggleVisibility,
}: SectionListItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleEditSave = (updatedItem: any) => {
    onUpdate(sectionId, id, updatedItem)
    setIsEditModalOpen(false)
  }

  const getTitle = () => {
    switch (sectionId) {
      
      // case 'experience':
      //   return item.company || item.position
      // case 'education':
      //   return item.institution || item.studyType
      // case 'projects':
      //   return item.name
      // case 'skills':
      //   return item.name
      default:
        return title
        // return item.name || 'Untitled'
    }
  }

  const getDescription = () => {
    switch (sectionId) {
      // case 'experience':
      //   return item.position || item.date
      // case 'education':
      //   return item.studyType || item.date
      // case 'projects':
      //   return item.description
      // case 'skills':
      //   return item.description
      default:
        return ''
    }
  }

  return (
    <>
      <motion.section
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          "group flex items-center border-b bg-background last:rounded-b",
          isDragging && "opacity-50 z-50",
          !item?.visible && "opacity-50"
        )}
      >
        <div
          {...listeners}
          {...attributes}
          className="flex w-8 cursor-move items-center justify-center self-stretch hover:bg-secondary"
        >
          <DotsSixVertical weight="bold" size={14} />
        </div>

        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className="flex-1 cursor-pointer p-3 hover:bg-secondary/20 active:bg-secondary/40 transition-colors duration-100"
              onClick={handleEdit}
            >
              <h4 className="font-medium leading-tight">{getTitle()}</h4>
              {getDescription() && <p className="text-xs leading-snug text-muted-foreground mt-0.5">{getDescription()}</p>}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuCheckboxItem checked={item.visible} onCheckedChange={onToggleVisibility}>
              <Eye size={14} className="mr-2" />
              可见
            </ContextMenuCheckboxItem>
            <ContextMenuItem onClick={handleEdit}>
              <PencilSimple size={14} className="mr-2" />
              编辑
            </ContextMenuItem>
            <ContextMenuItem onClick={onDuplicate}>
              <CopySimple size={14} className="mr-2" />
              复制
            </ContextMenuItem>
            <ContextMenuItem className="text-destructive" onClick={onDelete}>
              <TrashSimple size={14} className="mr-2" />
              删除
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onToggleVisibility}>
            {item.visible ? <Eye size={14} /> : <EyeSlash size={14} />}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleEdit}>
            <PencilSimple size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onDuplicate}>
            <CopySimple size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onDelete}>
            <TrashSimple size={14} />
          </Button>
        </div>
      </motion.section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
        item={item}
        sectionId={sectionId}
      />
    </>
  )
}