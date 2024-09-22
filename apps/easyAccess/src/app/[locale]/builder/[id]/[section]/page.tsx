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

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: "",
    headline: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    customFields: []
  })

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

  const renderBasicInfo = () => (
    <section id="basics" className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <User size={32} />
          <h2 className="text-2xl font-bold">基础信息</h2>
        </div>
      </header>

      <main className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.name">全名</Label>
          <Input
            id="basics.name"
            value={basicInfo.name}
            onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.headline">职位概述</Label>
          <Input
            id="basics.headline"
            value={basicInfo.headline}
            onChange={(e) => setBasicInfo({ ...basicInfo, headline: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.email">电子邮件</Label>
          <Input
            id="basics.email"
            placeholder="john.doe@example.com"
            value={basicInfo.email}
            onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.phone">电话</Label>
          <Input
            id="basics.phone"
            placeholder="+86 123 4567 8900"
            value={basicInfo.phone}
            onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.website">个人网站</Label>
          <Input
            id="basics.website"
            placeholder="https://example.com"
            value={basicInfo.website}
            onChange={(e) => setBasicInfo({ ...basicInfo, website: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.location">所在地</Label>
          <Input
            id="basics.location"
            value={basicInfo.location}
            onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>自定义字段</Label>
          {basicInfo.customFields.map((field, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                placeholder="字段名"
                value={field.key}
                onChange={(e) => {
                  const newFields = [...basicInfo.customFields]
                  newFields[index].key = e.target.value
                  setBasicInfo({ ...basicInfo, customFields: newFields })
                }}
              />
              <Input
                placeholder="值"
                value={field.value}
                onChange={(e) => {
                  const newFields = [...basicInfo.customFields]
                  newFields[index].value = e.target.value
                  setBasicInfo({ ...basicInfo, customFields: newFields })
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newFields = basicInfo.customFields.filter((_, i) => i !== index)
                  setBasicInfo({ ...basicInfo, customFields: newFields })
                }}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBasicInfo({
              ...basicInfo,
              customFields: [...basicInfo.customFields, { key: "", value: "" }]
            })}
          >
            <Plus size={16} className="mr-2" />
            添加自定义字段
          </Button>
        </div>
      </main>
    </section>
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
        return renderBasicInfo()
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