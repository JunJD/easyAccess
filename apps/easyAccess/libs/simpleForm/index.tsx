/* eslint-disable react-refresh/only-export-components */
import { FormProps } from "./types/form";
import DefaultFormRender from './render'

import dayjs from "dayjs";
import { Input } from "../ui";
import { Select } from "../ui/select";
import { Slider } from "../ui/slider";

const widgets = {
    Input: Input,
    // "Input.TextArea": Input.TextArea,
    // "Input.Password": Input.Password,
    // "Input.Search": Input.Search,
    // InputNumber: InputNumber,
    // Checkbox: Checkbox,
    // "Checkbox.Group": Checkbox.Group,
    // DatePicker: DatePicker,
    // "DatePicker.RangePicker": DatePicker.RangePicker,
    // Mentions: Mentions,
    // "Mentions.Option": Mentions.Option,
    // Radio: Radio,
    // "Radio.Group": Radio.Group,
    // "Radio.Button": Radio.Button,
    // Rate: Rate,
    Select: Select,
    // "Select.Option": Select.Option,
    // TreeSelect: TreeSelect,
    Slider: Slider,
    // Switch: Switch,
    // TimePicker: TimePicker,
    // "TimePicker.RangePicker": TimePicker.RangePicker,
};

export default function FormRender(props: FormProps) {
    console.log('formRender一级的props', props);

    const { components, variables, ...rest } = props;
    return (
        <DefaultFormRender
            options={{ props: { autoComplete: "off" } }}
            components={{ ...widgets, ...components }}
            variables={{ ...variables, dayjs }}
            {...rest}
        />
    );
}