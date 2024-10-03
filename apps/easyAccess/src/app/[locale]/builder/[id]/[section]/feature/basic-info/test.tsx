import { zodResolver } from "@hookform/resolvers/zod";
import FormRender from "apps/easyAccess/libs/simpleForm"
import { schemaTemplate } from "apps/easyAccess/libs/simpleForm/schema";
import { Button } from "apps/easyAccess/libs/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TestBasicInfo = () => {

    function SetFormRuler(schema: any): z.ZodType {
        const obj = {} as any;
        schema.map((item: any) => {
            // console.log('111', item);
            if (Object.prototype.hasOwnProperty.call(item, "rules")) {
                console.log(item.name, "校验规则", item.rules);
                obj[item.name] = z.string({
                    required_error: `${item.name}不能为空`
                }).max(3, '长度不能超过3')
            }
        });
        console.log('obj', obj);

        return z.object(obj);
    }

    const form = useForm({
        resolver: zodResolver(SetFormRuler(schemaTemplate)),
        defaultValues: undefined,
        // values: undefined,
    });

    useEffect(()=>{
        console.log('change', form)
    },[form.getValues()])
    
    function handleSubmit() {
        console.log("表单提交", form.getValues());
    }


    return <>
        <FormRender form={form} schema={schemaTemplate} />
        <Button
            onClick={handleSubmit}
            variant="outline"
            className="h-9 text-sm"
        >
            提交
        </Button></>
}

export default TestBasicInfo