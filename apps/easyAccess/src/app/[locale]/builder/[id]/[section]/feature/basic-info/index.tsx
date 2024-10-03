import { Plus, Trash, User } from "@phosphor-icons/react"
import { basicsSchema } from "apps/easyAccess/libs/schema";
import { Button } from "apps/easyAccess/libs/ui/Button";
import { Input } from "apps/easyAccess/libs/ui/input"
import { Label } from "apps/easyAccess/libs/ui/label"
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { curry } from "lodash-es";
import { FC, useEffect } from "react";
import FormRender from "apps/easyAccess/libs/simpleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./formSchema";

const BasicInfo: FC<{ id: string }> = ({ id }) => {
    const setValue = useResumeStore((state) => curry(state.setResumeValue))(id);
    const basicInfo = useResumeStore(state => state.activeResumeData.basics)

    const form = useForm({
        resolver: zodResolver(basicsSchema),
        values: basicInfo,
    });

    useEffect(()=>{
        setValue('basics', {
            ...basicInfo,
            ...form.getValues()
        })
    }, form.watch(['name', 'email', 'headline', 'phone', 'location']))

    return (
        <section id="basics" className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <User size={32} />
                    <h2 className="text-2xl font-bold">基础信息</h2>
                </div>
            </header>

            <FormRender form={form} schema={formSchema} />

            <div className="space-y-2 sm:col-span-2 flex flex-col">
                <Label>自定义字段</Label>
                {basicInfo.customFields?.map((field, index) => (
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
                            <Trash size={14} />
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

        </section>
    )
}

export default BasicInfo