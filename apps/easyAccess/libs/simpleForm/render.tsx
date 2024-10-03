
import { FormProps } from "./types/form";

import FormComponent from "./formComponent";
import { Form } from "apps/easyAccess/libs/ui/form";

export default function FormRender(props: FormProps) {
    return (
        <main className="grid gap-4 sm:grid-cols-2">
            <Form {...props.form}>
                {props?.schema?.map((item: any, index: number) => {
                    return <FormComponent form={props.form} key={index} {...item} />;
                })}
            </Form>
        </main>
    );
}