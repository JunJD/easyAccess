'use client'

import { Alarm, AlignLeft, PlusCircle, Trash } from "@phosphor-icons/react"
import { Button } from "apps/easyAccess/libs/ui/Button"
import { Input } from "apps/easyAccess/libs/ui/input"
import { Label } from "apps/easyAccess/libs/ui/label"
import { Textarea } from "apps/easyAccess/libs/ui/textarea"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent } from "apps/easyAccess/libs/ui/card"

export default function SectionPage() {
  const params = useParams()
  const section = params.section as string

  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    expectedSalary: "",
    customFields: [{ key: "", value: "" }],
    personalStrengths: ""
  })

  const [workExperience, setWorkExperience] = useState([
    { id: "1", company: "", position: "", dateRange: "", summary: "", isOpen: true }
  ])

  const [education, setEducation] = useState([
    { id: "1", school: "", degree: "", graduationDate: "", isOpen: true }
  ])

  const [projects, setProjects] = useState([
    { id: "1", name: "", description: "", technologies: "", isOpen: true }
  ])

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">基础信息</h2>
      <Input
        placeholder="全名"
        value={basicInfo.fullName}
        onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })}
      />
      <Input
        placeholder="电子邮件"
        type="email"
        value={basicInfo.email}
        onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
      />
      <Input
        placeholder="电话"
        value={basicInfo.phone}
        onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
      />
      <Input
        placeholder="位置"
        value={basicInfo.location}
        onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
      />
      <Input
        placeholder="期望薪资"
        value={basicInfo.expectedSalary}
        onChange={(e) => setBasicInfo({ ...basicInfo, expectedSalary: e.target.value })}
      />
      <Textarea
        placeholder="个人优势"
        value={basicInfo.personalStrengths}
        onChange={(e) => setBasicInfo({ ...basicInfo, personalStrengths: e.target.value })}
      />
      <div className="space-y-2">
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
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => setBasicInfo({
            ...basicInfo,
            customFields: [...basicInfo.customFields, { key: "", value: "" }]
          })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          添加自定义字段
        </Button>
      </div>
    </div>
  )

  const renderWorkExperience = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">工作经历</h2>
      {workExperience.map((job, index) => (
        <Card key={job.id} className="overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
            onClick={() => {
              const newExperience = [...workExperience]
              newExperience[index].isOpen = !newExperience[index].isOpen
              setWorkExperience(newExperience)
            }}
          >
            <h3 className="text-lg font-semibold">
              {job.company || job.position || `工作经历 ${index + 1}`}
            </h3>
            {job.isOpen ? <Alarm className="h-5 w-5" /> : <AlignLeft className="h-5 w-5" />}
          </div>
          {job.isOpen && (
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="公司"
                value={job.company}
                onChange={(e) => {
                  const newExperience = [...workExperience]
                  newExperience[index].company = e.target.value
                  setWorkExperience(newExperience)
                }}
              />
              <Input
                placeholder="职位"
                value={job.position}
                onChange={(e) => {
                  const newExperience = [...workExperience]
                  newExperience[index].position = e.target.value
                  setWorkExperience(newExperience)
                }}
              />
              <Input
                placeholder="日期范围"
                value={job.dateRange}
                onChange={(e) => {
                  const newExperience = [...workExperience]
                  newExperience[index].dateRange = e.target.value
                  setWorkExperience(newExperience)
                }}
              />
              <Textarea
                placeholder="工作总结"
                value={job.summary}
                onChange={(e) => {
                  const newExperience = [...workExperience]
                  newExperience[index].summary = e.target.value
                  setWorkExperience(newExperience)
                }}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setWorkExperience(workExperience.filter((_, i) => i !== index))}
              >
                <Trash className="mr-2 h-4 w-4" />
                删除此工作经历
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
      <Button
        variant="outline"
        onClick={() => setWorkExperience([...workExperience, { id: Date.now().toString(), company: "", position: "", dateRange: "", summary: "", isOpen: true }])}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        添加工作经历
      </Button>
    </div>
  )

  const renderEducation = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">教育经历</h2>
      {education.map((edu, index) => (
        <Card key={edu.id} className="overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
            onClick={() => {
              const newEducation = [...education]
              newEducation[index].isOpen = !newEducation[index].isOpen
              setEducation(newEducation)
            }}
          >
            <h3 className="text-lg font-semibold">
              {edu.school || edu.degree || `教育经历 ${index + 1}`}
            </h3>
            {edu.isOpen ? <Alarm className="h-5 w-5" /> : <AlignLeft className="h-5 w-5" />}
          </div>
          {edu.isOpen && (
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="学校"
                value={edu.school}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].school = e.target.value
                  setEducation(newEducation)
                }}
              />
              <Input
                placeholder="学位"
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].degree = e.target.value
                  setEducation(newEducation)
                }}
              />
              <Input
                placeholder="毕业日期"
                value={edu.graduationDate}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].graduationDate = e.target.value
                  setEducation(newEducation)
                }}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setEducation(education.filter((_, i) => i !== index))}
              >
                <Trash className="mr-2 h-4 w-4" />
                删除此教育经历
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
      <Button
        variant="outline"
        onClick={() => setEducation([...education, { id: Date.now().toString(), school: "", degree: "", graduationDate: "", isOpen: true }])}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        添加教育经历
      </Button>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">项目经历</h2>
      {projects.map((project, index) => (
        <Card key={project.id} className="overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
            onClick={() => {
              const newProjects = [...projects]
              newProjects[index].isOpen = !newProjects[index].isOpen
              setProjects(newProjects)
            }}
          >
            <h3 className="text-lg font-semibold">
              {project.name || `项目 ${index + 1}`}
            </h3>
            {project.isOpen ? <AlignLeft className="h-5 w-5" /> : <AlignLeft className="h-5 w-5" />}
          </div>
          {project.isOpen && (
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="项目名称"
                value={project.name}
                onChange={(e) => {
                  const newProjects = [...projects]
                  newProjects[index].name = e.target.value
                  setProjects(newProjects)
                }}
              />
              <Textarea
                placeholder="项目描述"
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...projects]
                  newProjects[index].description = e.target.value
                  setProjects(newProjects)
                }}
              />
              <Input
                placeholder="使用的技术"
                value={project.technologies}
                onChange={(e) => {
                  const newProjects = [...projects]
                  newProjects[index].technologies = e.target.value
                  setProjects(newProjects)
                }}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setProjects(projects.filter((_, i) => i !== index))}
              >
                <Trash className="mr-2 h-4 w-4" />
                删除此项目
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
      <Button
        variant="outline"
        onClick={() => setProjects([...projects, { id: Date.now().toString(), name: "", description: "", technologies: "", isOpen: true }])}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        添加项目经历
      </Button>
    </div>
  )

  const renderSection = () => {
    switch (section) {
      case 'basic':
        return renderBasicInfo()
      case 'work':
        return renderWorkExperience()
      case 'education':
        return renderEducation()
      case 'projects':
        return renderProjects()
      default:
        return <div>请选择一个部分来编辑</div>
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {renderSection()}
    </div>
  )
}