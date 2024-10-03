export const formSchema = [
    {
        name: "name",
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
        label: "全名",
        chosen: false,
        footer: "在这里输入用户名",
        suffix: "",
    },
    {
        name: "email",
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
        label: "电子邮件",
        chosen: false,
        footer: "在这里输入用户名",
        suffix: "",
    },
    {
        name: "headline",
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
        label: "职位概述",
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
        name: "phone",
        type: "Input", // InputNumber
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
        label: "手机号",
        chosen: false,
        colon: false,
    }
];