
'use client'
import { useState } from "react"
import {
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
    Plus,
    UserCircle as CircleUser,
} from "@phosphor-icons/react"

import { Button } from "apps/easyAccess/libs/ui/Button"
import { Textarea } from "apps/easyAccess/libs/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "apps/easyAccess/libs/ui/select"
import { Label } from "apps/easyAccess/libs/ui/label"
import { Input } from "apps/easyAccess/libs/ui/input"
import IconWithFallback from "../_component/IconWithFallback"


const BuilderPage = () => {

    const [sections, setSections] = useState([
        { id: "basic-info", title: "Basic Info", icon: CircleUser },
        { id: "personal-info", title: "Personal Info", icon: Phone },
        { id: "work-experience", title: "Work Experience", icon: Briefcase },
        { id: "education", title: "Education", icon: GraduationCap },
        { id: "skills", title: "Skills", icon: Award },
        { id: "languages", title: "Languages", icon: Languages },
    ])

    const [activeSection, setActiveSection] = useState("basic-info")

    const [basicInfo, setBasicInfo] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
    })

    const handleBasicInfoChange = (field: string, value: string) => {
        setBasicInfo(prev => ({ ...prev, [field]: value }))
    }

    return (
        (
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
                            <div className="rounded-lg border p-4 bg-white dark:bg-gray-800 shadow-sm">
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
                            <div className="rounded-lg border p-4 bg-white dark:bg-gray-800 shadow-sm">
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
                            <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
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
                            <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
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
                                <div className="rounded-lg border p-4 bg-white dark:bg-gray-800 shadow-sm">
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
    )
}

export default BuilderPage