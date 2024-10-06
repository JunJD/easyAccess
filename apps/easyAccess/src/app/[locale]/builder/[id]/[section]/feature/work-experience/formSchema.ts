export interface FormSchema {
    name: string;
    type: string;
    props: any;
    layout: string;
    panel: {
        icon: string;
        label: string;
    };
    label: string;
    chosen: boolean;
    footer?: string;
    suffix?: string;
    colon?: boolean
}

export const formSchema: FormSchema[] = [
    {
        name: "company",
        type: "Input",
        props: {
            placeholder: "请输入",
            maxLength: 30,
            size: "middle",
        },
        layout: "vertical",
        panel: {
            icon: "text-field",
            label: "输入框",
        },
        label: "公司",
        chosen: false,
        footer: "在这里输入用户名",
        suffix: "",
    },
    {
        name: "position",
        type: "Input",
        props: {
            placeholder: "请输入",
            maxLength: 30,
            size: "middle",
        },
        layout: "horizontal",
        panel: {
            icon: "text-field",
            label: "输入框",
        },
        label: "地点",
        chosen: false,
        footer: "在这里输入用户名",
        suffix: "",
    },
    {
        name: "date",
        type: "Input", // Input.Password
        props: {
            placeholder: "请输入",
            maxLength: 30,
            size: "middle",
        },
        layout: "horizontal",
        panel: {
            icon: "text-field",
            label: "输入框",
        },
        label: "日期",
        chosen: false,
    },
    {
        name: "location",
        type: "Input",
        props: {
            placeholder: "请输入",
            maxLength: 30,
            size: "middle",
        },
        layout: "horizontal",
        panel: {
            icon: "text-field",
            label: "输入框",
        },
        label: "所在地点",
        chosen: false,
        footer: "在这里输入用户名",
        suffix: "",
    },
    {
        name: "summary",
        type: "RichInput",
        props: {
            placeholder: "请输入",
            maxLength: 30,
            size: "middle",
        },
        layout: "vertical",
        panel: {
            icon: "text-field",
            label: "输入框",
        },
        label: "标题简介",
        chosen: false,
        colon: false,
    }
];