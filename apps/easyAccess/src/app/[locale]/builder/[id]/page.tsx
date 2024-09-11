
'use client'
import { useState } from "react"
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
    Microphone
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
import { Label } from "apps/easyAccess/libs/ui/label"
import { Input } from "apps/easyAccess/libs/ui/input"
import { Panel, PanelGroup, PanelResizeHandle } from "apps/easyAccess/libs/ui/resizable-panel"
import { cn } from "@easy-access/utils"

// Helper function to render icon with fallback
const IconWithFallback = ({ icon: Icon, ...props }: { icon: Icon } & React.ComponentPropsWithoutRef<"svg">) => {
    if (!Icon) return null
    return <Icon {...props} />
}


const BuilderPage = () => {

    const [isMobile, setIsMobile] = useState(false)
    const [activeTab, setActiveTab] = useState("content")
    const [sections, setSections] = useState([
        { id: "basic-info", title: "Basic Info", icon: CircleUser },
        { id: "personal-info", title: "Personal Info", icon: Phone },
        { id: "work-experience", title: "Work Experience", icon: Briefcase },
        { id: "education", title: "Education", icon: GraduationCap },
        { id: "skills", title: "Skills", icon: Award },
        { id: "languages", title: "Languages", icon: Languages },
    ])
    const [activeSection, setActiveSection] = useState("basic-info")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [basicInfo, setBasicInfo] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
    })

    // useEffect(() => {
    //     const checkMobile = () => {
    //         setIsMobile(window.innerWidth < 768)
    //     }
    //     window.addEventListener('resize', checkMobile)
    //     checkMobile()
    //     return () => window.removeEventListener('resize', checkMobile)
    // }, [])

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

    const moveSectionUp = (index: number) => {
        if (index > 0) {
            const newSections = [...sections]
            const temp = newSections[index]
            newSections[index] = newSections[index - 1]
            newSections[index - 1] = temp
            setSections(newSections)
        }
    }

    const moveSectionDown = (index: number) => {
        if (index < sections.length - 1) {
            const newSections = [...sections]
            const temp = newSections[index]
            newSections[index] = newSections[index + 1]
            newSections[index + 1] = temp
            setSections(newSections)
        }
    }

    const handleBasicInfoChange = (field: string, value: string) => {
        setBasicInfo(prev => ({ ...prev, [field]: value }))
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
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
            <ScrollArea className="flex-1">
                <nav className="grid gap-1 p-2">
                    {sections.map((section, index) => (
                        <div key={section.id} className="flex items-center gap-2">
                            <Button
                                variant={activeSection === section.id ? "secondary" : "ghost"}
                                className="justify-start gap-2 flex-grow"
                                onClick={() => {
                                    setActiveSection(section.id)
                                    if (isMobile) setIsDrawerOpen(false)
                                }}
                            >
                                <IconWithFallback icon={section.icon} className="h-4 w-4" />
                                {section.title}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSectionUp(index)}
                                disabled={index === 0}
                            >
                                <IconWithFallback icon={ChevronUp} className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSectionDown(index)}
                                disabled={index === sections.length - 1}
                            >
                                <IconWithFallback icon={ChevronDown} className="h-4 w-4" />
                            </Button>
                            {index > 5 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSection(section.id)}
                                >
                                    <IconWithFallback icon={X} className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>
            <div className="border-t p-4">
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                        setActiveTab("template")
                        if (isMobile) setIsDrawerOpen(false)
                    }}
                >
                    <IconWithFallback icon={Layout} className="h-4 w-4" />
                    Templates & Layout
                </Button>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2 mt-2"
                    onClick={() => {
                        setActiveTab("ai-copilot")
                        if (isMobile) setIsDrawerOpen(false)
                    }}
                >
                    <IconWithFallback icon={Bot} className="h-4 w-4" />
                    AI Copilot
                </Button>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2 mt-2"
                    onClick={() => {
                        setActiveTab("mock-interview")
                        if (isMobile) setIsDrawerOpen(false)
                    }}
                >
                    <IconWithFallback icon={Mess} className="h-4 w-4" />
                    AI Mock Interview
                </Button>
            </div>
        </div>
    )

    const EditContent = () => (
        <div className="space-y-8">
            {activeSection === "basic-info" && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={basicInfo.name}
                                onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={basicInfo.email}
                                onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                                placeholder="john.doe@example.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={basicInfo.phone}
                                onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={basicInfo.location}
                                onChange={(e) => handleBasicInfoChange('location', e.target.value)}
                                placeholder="City, Country"
                            />
                        </div>
                    </div>
                </section>
            )}
            {activeSection === "personal-info" && (
                <>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="title">Professional Title</Label>
                                <Input id="title" placeholder="Software Engineer" />
                            </div>
                            <div>
                                <Label htmlFor="summary">Professional Summary</Label>
                                <Textarea id="summary" placeholder="Brief overview of your professional background and key skills..." />
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <IconWithFallback icon={Mail} className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" placeholder="john.doe@example.com" className="pl-8" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <div className="relative">
                                        <IconWithFallback icon={Phone} className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="phone" placeholder="+1 234 567 890" className="pl-8" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <IconWithFallback icon={MapPin} className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="location" placeholder="City, Country" className="pl-8" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" placeholder="https://yourwebsite.com" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <div className="relative">
                                        <IconWithFallback icon={Linkedin} className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="linkedin" placeholder="linkedin.com/in/johndoe" className="pl-8" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="github">GitHub</Label>
                                    <div className="relative">
                                        <IconWithFallback icon={Github} className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="github" placeholder="github.com/johndoe" className="pl-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
            {activeSection === "work-experience" && (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Work Experience</h2>
                        <Button variant="outline" size="sm">
                            <IconWithFallback icon={Plus} className="h-4 w-4 mr-2" />
                            Add Experience
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold">Software Engineer</h3>
                                    <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <IconWithFallback icon={Trash2} className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input placeholder="Start Date" />
                                    <Input placeholder="End Date" />
                                </div>
                                <Textarea placeholder="Job responsibilities and achievements..." />
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {activeSection === "education" && (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Education</h2>
                        <Button variant="outline" size="sm">
                            <IconWithFallback icon={Plus} className="h-4 w-4 mr-2" />
                            Add Education
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                                    <p className="text-sm text-muted-foreground">University of Technology</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <IconWithFallback icon={Trash2} className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input placeholder="Start Date" />
                                    <Input placeholder="End Date" />
                                </div>
                                <Textarea placeholder="Relevant coursework, achievements, or projects..." />
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {activeSection === "skills" && (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Skills</h2>
                        <Button variant="outline" size="sm">
                            <IconWithFallback icon={Plus} className="h-4 w-4 mr-2" />
                            Add Skill
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <Input placeholder="Skill name" className="w-full md:w-2/3" />
                            <Select>
                                <SelectTrigger className="w-full md:w-1/4">
                                    <SelectValue placeholder="Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                    <SelectItem value="expert">Expert</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon" className="mt-2 md:mt-0">
                                <IconWithFallback icon={Trash2} className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>
            )}
            {activeSection === "languages" && (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Languages</h2>
                        <Button variant="outline" size="sm">
                            <IconWithFallback icon={Plus} className="h-4 w-4 mr-2" />
                            Add Language
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <Input placeholder="Language name" className="w-full md:w-2/3" />
                            <Select>
                                <SelectTrigger className="w-full md:w-1/4">
                                    <SelectValue placeholder="Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                    <SelectItem value="native">Native</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon" className="mt-2 md:mt-0">
                                <IconWithFallback icon={Trash2} className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>
            )}
            {sections.slice(6).map(section => (
                activeSection === section.id && (
                    <section key={section.id}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">{section.title}</h2>
                            <Button variant="outline" size="sm">
                                <IconWithFallback icon={Plus} className="h-4 w-4 mr-2" />
                                Add Item
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-lg border p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Input placeholder="Item Title" className="w-2/3" />
                                    <Button variant="ghost" size="icon">
                                        <IconWithFallback icon={Trash2} className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Textarea placeholder="Description..." className="mt-2" />
                            </div>
                        </div>
                    </section>
                )
            ))}
        </div>
    )

    const TemplateAndLayoutContent = () => (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Template Selection</h2>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                </Select>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4">Font Settings</h2>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="font-family">Font Family</Label>
                        <Select>
                            <SelectTrigger id="font-family">
                                <SelectValue placeholder="Choose a font" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="arial">Arial</SelectItem>
                                <SelectItem value="helvetica">Helvetica</SelectItem>
                                <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                                <SelectItem value="calibri">Calibri</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="font-size">Font Size</Label>
                        <Slider
                            id="font-size"
                            min={8}
                            max={24}
                            step={1}
                            defaultValue={[12]}
                            className="w-full"
                        />
                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4">Layout Settings</h2>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="margin">Margin</Label>
                        <Slider
                            id="margin"
                            min={0}
                            max={50}
                            step={1}
                            defaultValue={[20]}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="line-spacing">Line Spacing</Label>
                        <Slider
                            id="line-spacing"
                            min={1}
                            max={2}
                            step={0.1}
                            defaultValue={[1.5]}
                            className="w-full"
                        />
                    </div>
                </div>
            </section>
        </div>
    )

    const AICopilotContent = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">AI Copilot</h2>
            <div className="rounded-lg border p-4 h-[calc(100vh-12rem)] flex flex-col">
                <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4">
                        <div className="bg-muted p-3 rounded-lg">
                            <p className="font-semibold">AI Copilot</p>
                            <p>Hello! I'm your AI Copilot. How can I assist you with your resume today?</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg">
                            <p className="font-semibold">You</p>
                            <p>Can you help me improve my professional summary?</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                            <p className="font-semibold">AI Copilot</p>
                            <p>I'd be happy to help you improve your professional summary. Could you please share your current summary or tell me about your professional background, key skills, and career goals?</p>
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex items-center space-x-2">
                    <Input placeholder="Type your message here..." />
                    <Button size="icon">
                        <IconWithFallback icon={Send} className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )

    const MockInterviewContent = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">AI Video Mock Interview</h2>
            <div className="rounded-lg border p-4 h-[calc(100vh-12rem)] flex flex-col">
                <div className="flex-1 mb-4 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                    <IconWithFallback icon={Video} className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-lg font-semibold mb-2">Video Interview Simulation</p>
                    <p className="text-sm text-gray-500 mb-4">Connect your camera and microphone to start</p>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <Button variant="outline" className="flex items-center justify-center">
                            <IconWithFallback icon={Video} className="h-4 w-4 mr-2" />
                            Enable Camera
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center">
                            <IconWithFallback icon={Microphone} className="h-4 w-4 mr-2" />
                            Enable Microphone
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Button className="w-full">Start Video Interview</Button>
                    <p className="text-sm text-center text-gray-500">
                        The AI interviewer will ask you questions. Respond as you would in a real interview.
                    </p>
                </div>
            </div>
        </div>
    )


    const sheet = useResumeStore((state) => state.sheet);
    const panel = useResumeStore((state) => state.panel);

    const leftSetSize = useResumeStore((state) => (size: number) => state.setPanelSize("left", size));
    const rightSetSize = useResumeStore((state) => (size: number) => state.setPanelSize("right", size));

    const setLeftDragging = useResumeStore((state) => (dragging: boolean) => state.setPaneDragging("left", dragging));
    const setRightDragging = useResumeStore((state) => (dragging: boolean) => state.setPaneDragging("right", dragging));

    return (
        <div className="relative size-full overflow-hidden">
            <PanelGroup direction="horizontal">
                <Panel
                    minSize={20}
                    maxSize={45}
                    defaultSize={20}
                    className={cn("z-10 bg-background", !panel.left.isDragging && "transition-[flex]")}
                    onResize={leftSetSize}
                >
                    <SidebarContent />
                    {/* {isMobile ? (
                        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                            <DrawerTrigger asChild>
                                <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
                                    <IconWithFallback icon={Menu} className="h-4 w-4" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Resume Editor</DrawerTitle>
                                    <DrawerDescription>Edit your resume sections here.</DrawerDescription>
                                </DrawerHeader>
                                <SidebarContent />
                            </DrawerContent>
                        </Drawer>
                    ) : (
                        <SidebarContent />
                    )} */}
                </Panel>
                <PanelResizeHandle
                    isDragging={panel.left.isDragging}
                    onDragging={setLeftDragging}
                />
                <Panel >
                    <main className="mt-16 w-screen absolute inset-0">
                    <iframe
                        // ref={setFrameRef}
                        // title={resume.id}
                        src="https://v0.dev/chat/1IfqcVbrGld"
                        className="mt-16 w-screen"
                        style={{ height: `calc(100vh - 64px)` }}
                    />
                    </main>
                </Panel>
                <PanelResizeHandle
                    isDragging={panel.right.isDragging}
                    onDragging={setRightDragging}
                />
                <Panel
                    minSize={20}
                    maxSize={45}
                    defaultSize={20}
                    className={cn("z-10 bg-background", !panel.right.isDragging && "transition-[flex]")}
                    onResize={rightSetSize}
                >
                    <div className="p-4">
                        {activeTab === "content" && <EditContent />}
                        {activeTab === "template" && <TemplateAndLayoutContent />}
                        {activeTab === "ai-copilot" && <AICopilotContent />}
                        {activeTab === "mock-interview" && <MockInterviewContent />}
                    </div>
                </Panel>

            </PanelGroup>
        </div>
    )
}

export default BuilderPage