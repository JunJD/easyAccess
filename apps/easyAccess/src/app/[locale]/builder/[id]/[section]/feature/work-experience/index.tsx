'use client'
import { createId } from "@paralleldrive/cuid2";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultExperience, experienceSchema } from "apps/easyAccess/libs/schema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    RichInput,
} from "apps/easyAccess/libs/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionDialog } from "../../shared/section-dialog";
import { useTranslations } from "next-intl";
import { SectionBase } from "../../shared/section-base";
import { useState } from "react";



const formSchema = experienceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ExperienceDialog = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    const form = useForm<FormValues>({
        defaultValues: {...defaultExperience, id: createId()},
        resolver: zodResolver(formSchema),
    });

    const t = useTranslations("builder.section.dialog.experience");

    return (
        <SectionDialog<FormValues>
            sectionKey="experience"
            form={form}
            defaultValues={defaultExperience}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                    name="company"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('company')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="position"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {t('position')}
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('date or date range')}</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder={'March 2023 - Present'} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="location"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('location')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="url"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                            <FormLabel>{t('website')}</FormLabel>
                            <FormControl>
                                {/* <URLInput {...field} /> */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="summary"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                            <FormLabel>{t('summary')}</FormLabel>
                            <FormControl>
                                <RichInput
                                    {...field}
                                    content={field.value}
                                    footer={(editor) => (
                                        null
                                    )}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </SectionDialog>
    );
};

const Experience = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => {
        setIsOpen(true);
    }
    const onOpenChange = (open: boolean) => {
        setIsOpen(open);
    }
    return (
        <>
            <ExperienceDialog isOpen={isOpen} onOpenChange={onOpenChange} />
            <SectionBase open={onOpen} sectionKey='experience' title={() => '工作经历'} description={() => '添加你的工作经历'} />
        </>
    )
}

export default Experience