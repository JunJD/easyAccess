
'use client'
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
    User as UserIcon,
    Briefcase,
    GraduationCap,
    ArrowSquareDown as Award,
    RocketLaunch as Languages,
    Mailbox as Mail,
    Phone,
    MapPin,
    LinkBreak as Linkedin,
    GithubLogo as Github,
    Translate as Trash2,
    Medal as Menu,
    Layout,
    Boat as Bot,
    MessengerLogo as Mess,
    SortAscending as Send,
    Plus,
    Video,
    X,
    Upload as ChevronUp,
    Download as ChevronDown,
    UserCircle as CircleUser,
    Microphone,
    DotsSixVertical
} from "@phosphor-icons/react"

import { type Icon } from "@phosphor-icons/react"

import { Button } from "apps/easyAccess/libs/ui/Button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "apps/easyAccess/libs/ui/drawer"

import { Textarea } from "apps/easyAccess/libs/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "apps/easyAccess/libs/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "apps/easyAccess/libs/ui/select"
import { Slider } from "apps/easyAccess/libs/ui/slider"
import { ScrollArea } from "apps/easyAccess/libs/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "apps/easyAccess/libs/ui/dialog"

import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { ResumeType } from "apps/easyAccess/src/types/resume/resumes";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Input } from "apps/easyAccess/libs/ui/input"
import { Link, useRouter } from "apps/easyAccess/src/navigation"
import IconWithFallback from "./IconWithFallback"


const SidebarContent = () => {
    const params = useParams()
    const id = params.id
    const router = useRouter()
    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return
        }

        const newSections = Array.from(sections)
        const [reorderedItem] = newSections.splice(result.source.index, 1)
        newSections.splice(result.destination.index, 0, reorderedItem)

        setSections(newSections)
    }
    const [activeSection, setActiveSection] = useState("basic-info")
    const [sections, setSections] = useState([
        { id: "basic-info", title: "Basic Info", icon: CircleUser },
        { id: "work-experience", title: "Work Experience", icon: Briefcase },
        { id: "education", title: "Education", icon: GraduationCap },
        { id: "projects", title: "Skills", icon: Award },
    ])

    const addCustomSection = (title: string) => {
        const newSection = {
            id: title.toLowerCase().replace(/\s+/g, '-'),
            title: title,
            icon: Award,
        }
        setSections([...sections, newSection])
        setActiveSection(newSection.id)
    }

    const removeSection = (id: string) => {
        setSections(sections.filter(section => section.id !== id))
        if (activeSection === id) {
            setActiveSection(sections[0].id)
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Resume Sections</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <IconWithFallback icon={Plus} className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Custom Section</DialogTitle>
                            <DialogDescription>
                                Enter a name for your new custom section.
                            </DialogDescription>
                        </DialogHeader>
                        <Input id="section-name" placeholder="Section Name" />
                        <DialogFooter>
                            <Button type="submit" onClick={() => {
                                const input = document.getElementById('section-name') as HTMLInputElement
                                if (input.value) {
                                    addCustomSection(input.value)
                                }
                            }}>
                                Add Section
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <ScrollArea className="flex-1 flex-col">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sections" key="sections" >
                        {(provided: any) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="p-2">
                                {sections.map((section, index) => (
                                    <Draggable key={section.id} draggableId={section.id} index={index} isDragDisabled={['basic-info'].includes(section.id)}>
                                        {(provided: any, snapshot: any) => (

                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`mb-2 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                                            >
                                                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-md border p-2 shadow-sm hover:shadow-md transition-shadow">
                                                    <div {...provided.dragHandleProps} className="cursor-move">
                                                        <IconWithFallback icon={DotsSixVertical} className="h-4 w-4 text-gray-400" />
                                                    </div>
                                                    <Button
                                                        asChild
                                                        variant={activeSection === section.id ? "secondary" : "ghost"}
                                                        className="justify-start gap-2 flex-grow text-left"
                                                    >
                                                        <Link href={`/builder/${id}/${section.id}`}>
                                                            <IconWithFallback icon={section.icon} className="h-4 w-4" />
                                                            {section.title}
                                                        </Link>
                                                    </Button>
                                                    {section.id !== "basic-info" && section.id !== "personal-info" && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeSection(section.id)}
                                                        >
                                                            <IconWithFallback icon={X} className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ScrollArea>
            <div className="border-t p-4">
                <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start gap-2 mb-2"
                >
                    <Link href={`/builder/${id}/template`}>
                        <IconWithFallback icon={Layout} className="h-4 w-4" />
                        Templates & Layout
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start gap-2 mb-2"
                >
                    <Link href={`/builder/${id}/ai-copilot`}>
                        <IconWithFallback icon={Bot} className="h-4 w-4" />
                        AI Copilot
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start gap-2"
                >
                    <Link href={`/builder/${id}/mock-interview`}>
                        <IconWithFallback icon={Mess} className="h-4 w-4" />
                        AI Mock Interview
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default SidebarContent