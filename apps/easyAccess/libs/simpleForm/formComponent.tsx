
import { Input } from "apps/easyAccess/libs/ui/input";
import { Select } from "apps/easyAccess/libs/ui/select2";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "apps/easyAccess/libs/ui/form";
import React from "react";
import { cn } from "@easy-access/utils";

export default function FormComponent(componentProps: any) {
    console.log('componentProps', componentProps);

    function setFormValue(name: string, value: any) {
        console.log(name, "输入的值", value);
        componentProps.form.setValue(name, value);
        console.log("表单的值", componentProps.form.getValues());
    }
    const usingClass = cn(componentProps.layout === 'vertical' ? 'sm:col-span-2' : '666')
    let Component = null;
    if (componentProps.type) {
        switch (componentProps.type) {
            case "Input":
                console.log(componentProps?.name, "的props", componentProps.form.control);
                Component = (
                    <FormField
                        control={componentProps.form?.control}
                        name={componentProps?.name}
                        render={(field) => (
                            <FormItem className={usingClass}>
                                <FormLabel className="w-1/6 font-bold">
                                    {/* after:ml-0.5 after:text-destructive after:content-['*'] */}
                                    {componentProps.label}：
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-9 text-sm"
                                        {...componentProps.props}
                                        defaultValue={componentProps.form.getValues()[componentProps.name]}
                                        onChange={(e) =>
                                            setFormValue(componentProps.name, e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );
                break;
            case "Select":
                console.log('componentProps', componentProps)
                Component = (
                    <FormItem className={usingClass}>
                        <FormLabel className="w-1/6 font-bold">
                            {componentProps.label}：
                        </FormLabel>
                        <FormControl>
                            <Select
                                {...componentProps.props}
                                defaultValue={componentProps.form.getValues()[componentProps.name]}
                                onChange={(e: any) => setFormValue(componentProps.name, e)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
                break;
            default:
                break;
        }
    }
    return Component
}