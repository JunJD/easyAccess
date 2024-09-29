'use client'

import { useParams } from "next/navigation"
import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, User, Briefcase, GraduationCap, FolderSimple, Trash } from "@phosphor-icons/react"




import { SectionListItem } from './_component/sectionListItem'
import { Label } from "apps/easyAccess/libs/ui/label"
import { Input } from "apps/easyAccess/libs/ui/input"
import { Button } from "apps/easyAccess/libs/ui/Button"
import { useResumeStore } from "apps/easyAccess/src/store/resume/store"
import { curry } from "lodash-es"
import BasicInfo from "./feature/basic-info"

interface BasicInfo {
  name: string
  headline: string
  email: string
  phone: string
  website: string
  location: string
  customFields: { key: string; value: string }[]
}

interface ExperienceItem {
  id: string
  company?: string
  position?: string
  dateRange?: string
  summary?: string
  school?: string
  degree?: string
  graduationDate?: string
  name?: string
  description?: string
  technologies?: string
  visible: boolean
}

type SectionType = 'work' | 'education' | 'projects' | 'basic-info'

export default function SectionPage() {
  const params = useParams()
  const { section } = params
  const setValue = useResumeStore((state) => curry(state.setResumeValue))(params.id as string);

  const [workExperience, setWorkExperience] = useState<ExperienceItem[]>([
    { id: "1", company: "", position: "", dateRange: "", summary: "", visible: true }
  ])

  const [education, setEducation] = useState<ExperienceItem[]>([
    { id: "1", school: "", degree: "", graduationDate: "", visible: true }
  ])

  const [projects, setProjects] = useState<ExperienceItem[]>([
    { id: "1", name: "", description: "", technologies: "", visible: true }
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const renderExperienceSection = (type: SectionType) => {
    const items = type === 'work' ? workExperience :
      type === 'education' ? education : projects
    const setItems = type === 'work' ? setWorkExperience :
      type === 'education' ? setEducation : setProjects
    const newItem: ExperienceItem = type === 'work'
      ? { id: Date.now().toString(), company: "", position: "", dateRange: "", summary: "", visible: true }
      : type === 'education'
        ? { id: Date.now().toString(), school: "", degree: "", graduationDate: "", visible: true }
        : { id: Date.now().toString(), name: "", description: "", technologies: "", visible: true }

    const icon = type === 'work' ? <Briefcase size={32} /> :
      type === 'education' ? <GraduationCap size={32} /> :
        <FolderSimple size={32} />

    const title = (item: ExperienceItem) =>
      type === 'work' ? item.company || item.position || '未命名工作经历' :
        type === 'education' ? item.school || item.degree || '未命名教育经历' :
          item.name || '未命名项目'

    const description = (item: ExperienceItem) =>
      type === 'work' ? item.dateRange :
        type === 'education' ? item.graduationDate :
          item.technologies

    const onDragEnd = (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }

    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid gap-y-6"
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            {icon}
            <h2 className="text-2xl font-bold">
              {type === 'work' ? '工作经历' : type === 'education' ? '教育经历' : '项目经历'}
            </h2>
          </div>
        </header>

        <main className="grid gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToParentElement]}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <AnimatePresence>
                {items.map((item) => (
                  <SectionListItem
                    sectionId={section as string}
                    item={item}
                    key={item.id}
                    id={item.id}
                    visible={item.visible}
                    title={title(item)}
                    description={description(item)}
                    onUpdate={() => {
                      // Implement update logic
                    }}
                    onDelete={() => {
                      setItems(items.filter((i) => i.id !== item.id))
                    }}
                    onDuplicate={() => {
                      setItems([...items, { ...item, id: Date.now().toString() }])
                    }}
                    onToggleVisibility={() => {
                      setItems(items.map((i) =>
                        i.id === item.id ? { ...i, visible: !i.visible } : i
                      ))
                    }}
                  />
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
        </main>

        <footer className="flex items-center justify-end">
          <Button variant="outline" className="gap-x-2" onClick={() => setItems([...items, newItem])}>
            <Plus size={16} />
            <span>添加新{type === 'work' ? '工作' : type === 'education' ? '教育' : '项目'}经历</span>
          </Button>
        </footer>
      </motion.section>
    )
  }

  const renderSection = () => {
    switch (section) {
      case 'basic-info':
        return <BasicInfo id={params.id as string}/>
      case 'work-experience':
        return renderExperienceSection('work')
      case 'education':
        return renderExperienceSection('education')
      case 'projects':
        return renderExperienceSection('projects')
      default:
        return <div>请选择一个部分来编辑</div>
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-8">
      {renderSection()}
    </div>
  )
}