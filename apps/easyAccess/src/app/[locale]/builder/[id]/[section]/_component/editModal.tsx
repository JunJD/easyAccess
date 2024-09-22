'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "apps/easyAccess/libs/ui/dialog"
import { Button } from "apps/easyAccess/libs/ui/Button"
import { Input } from "apps/easyAccess/libs/ui/input"
import { Textarea } from "apps/easyAccess/libs/ui/textarea"
import { Label } from "apps/easyAccess/libs/ui/label"

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (updatedItem: any) => void
    item: any
    sectionId: string
}

export default function EditModal({ isOpen, onClose, onSave, item, sectionId }: EditModalProps) {
    const [editedItem, setEditedItem] = useState(item)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditedItem((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        onSave(editedItem)
    }

    const renderFields = () => {
        switch (sectionId) {
            case 'work-experience':
                return (
                    <>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="company">公司</Label>
                            <Input
                                id="company"
                                name="company"
                                value={editedItem.company}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="position">职位</Label>
                            <Input
                                id="position"
                                name="position"
                                value={editedItem.position}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="location">地点</Label>
                            <Input
                                id="location"
                                name="location"
                                value={editedItem.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="date">日期</Label>
                            <Input
                                id="date"
                                name="date"
                                value={editedItem.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="summary">总结</Label>
                            <Textarea
                                id="summary"
                                name="summary"
                                value={editedItem.summary}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )
            case 'education':
                return (
                    <>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="institution">学校</Label>
                            <Input
                                id="institution"
                                name="institution"
                                value={editedItem.institution}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="studyType">学位</Label>
                            <Input
                                id="studyType"
                                name="studyType"
                                value={editedItem.studyType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="area">专业</Label>
                            <Input
                                id="area"
                                name="area"
                                value={editedItem.area}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="date">日期</Label>
                            <Input
                                id="date"
                                name="date"
                                value={editedItem.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )
            case 'projects':
                return (
                    <>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="name">项目名称</Label>
                            <Input
                                id="name"
                                name="name"
                                value={editedItem.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">描述</Label>
                            <Input
                                id="description"
                                name="description"
                                value={editedItem.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="summary">总结</Label>
                            <Textarea
                                id="summary"
                                name="summary"
                                value={editedItem.summary}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )
            case 'skills':
                return (
                    <>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="name">技能名称</Label>
                            <Input
                                id="name"
                                name="name"
                                value={editedItem.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">描述</Label>
                            <Input
                                id="description"
                                name="description"
                                value={editedItem.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="keywords">关键词</Label>
                            <Input
                                id="keywords"
                                name="keywords"
                                value={editedItem.keywords.join(', ')}
                                onChange={(e) => setEditedItem((prev: any) => ({ ...prev, keywords: e.target.value.split(', ') }))}
                            />
                        </div>
                    </>
                )
            default:
                return (
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="name">名称</Label>
                        <Input
                            id="name"
                            name="name"
                            value={editedItem.name}
                            onChange={handleInputChange}
                        />
                    </div>
                )
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>编辑 {item.name || '项目'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {renderFields()}
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        取消
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        保存
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}