import { Plus, Trash, User } from "@phosphor-icons/react"
import { basicsSchema } from "apps/easyAccess/libs/schema";
import { Button } from "apps/easyAccess/libs/ui/Button";
import { Input } from "apps/easyAccess/libs/ui/input"
import { Label } from "apps/easyAccess/libs/ui/label"
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { curry } from "lodash-es";
import { FC } from "react";

const BasicInfo: FC<{ id: string }> = ({ id }) => {
    const setValue = useResumeStore((state) => curry(state.setResumeValue))(id);
    const basicInfo = useResumeStore(state => state.activeResumeData.basics)
    return (
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
                        hasError={!basicsSchema.pick({ name: true }).safeParse({ name: basicInfo.name }).success}
                        onChange={(e) => setValue("basics.name", e.target.value)}
                    />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="basics.headline">职位概述</Label>
                    <Input
                        id="basics.headline"
                        value={basicInfo.headline}
                        onChange={(e) => setValue("basics.headline", e.target.value)}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="basics.email">电子邮件</Label>
                    <Input
                        id="basics.email"
                        placeholder="john.doe@example.com"
                        value={basicInfo.email ?? ''}
                        onChange={(e) => setValue("basics.email", e.target.value)}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="basics.phone">电话</Label>
                    <Input
                        id="basics.phone"
                        placeholder="+86 123 4567 8900"
                        value={basicInfo.phone}
                        onChange={(e) => setValue("basics.phone", e.target.value)}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="basics.location">所在地</Label>
                    <Input
                        id="basics.location"
                        value={basicInfo.location}
                        onChange={(e) => setValue("basics.location", e.target.value)}
                    />
                </div>

                <div className="space-y-2 sm:col-span-2 flex flex-col">
                    <Label>自定义字段</Label>
                    {basicInfo.customFields.map((field, index) => (
                        <div key={index} className="flex gap-2 flex-row">
                            <Input
                                placeholder="字段名"
                                value={field.id}
                                onChange={(e) => {
                                    const newFields = [...basicInfo.customFields]
                                    setValue("basics.customFields", newFields.map((_, i) => i !== index ? _ : { ..._, id: e.target.value }))
                                }}
                            />
                            <Input
                                placeholder="值"
                                value={field.value}
                                onChange={(e) => {
                                    const newFields = [...basicInfo.customFields]
                                    setValue("basics.customFields", newFields.map((_, i) => i !== index ? _ : { ..._, value: e.target.value }))
                                }}
                            />
                            <Button
                                variant="ghost"
                                className="px-2 mt-1"
                                size="icon"
                                onClick={() => {
                                    const newFields = basicInfo.customFields.filter((_, i) => i !== index)
                                    setValue("basics.customFields", newFields)
                                }}
                            >
                                <Trash  size={14} />
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setValue("basics.customFields", [...basicInfo.customFields, { id: "", value: "" }])}
                    >
                        <Plus size={16} className="mr-2" />
                        添加自定义字段
                    </Button>
                </div>
            </main>
        </section>
    )
}

export default BasicInfo