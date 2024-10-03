
'use client'
import {
    Check,
    CaretDown,
    Download as ChevronDown,
} from "@phosphor-icons/react"
import * as SelectPrimitive from "@radix-ui/react-select";

import React, { FC } from "react";
import { Button } from "./Button";
import { cn } from "@easy-access/utils";

interface SelectOption {
    label: string
    value: string
}

interface SelectProps {
    defaultValue?: string
    placeholder?: string
    maxTagCount?: number
    size?: "small" | "middle" | "large"
    style?: React.CSSProperties
    options: SelectOption[]

}

const Select: FC<SelectProps> = (props) => {
    const {
        defaultValue,
        placeholder,
        maxTagCount,
        size,
        style,
        options
    } = props
    return (
        <SelectPrimitive.Root defaultValue={defaultValue ?? options[0].value}>
            <SelectPrimitive.Trigger asChild aria-label="Food">
                <Button>
                    <SelectPrimitive.Value />
                    <SelectPrimitive.Icon className="ml-2">
                        <CaretDown className="h-4 w-4" />
                    </SelectPrimitive.Icon>
                </Button>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content>
                <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <ChevronDown />
                </SelectPrimitive.ScrollUpButton>
                <SelectPrimitive.Viewport className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
                    <SelectPrimitive.Group>
                        {options.map(
                            (option) => (
                                <SelectPrimitive.Item
                                    key={`select-primitive-item-${option.value}`}
                                    value={option.value.toLowerCase()}
                                    className={cn(
                                        "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900",
                                        "radix-disabled:opacity-50",
                                        "focus:outline-none select-none"
                                    )}
                                >
                                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                                    <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                                        <Check className="h-4 w-4" />
                                    </SelectPrimitive.ItemIndicator>
                                </SelectPrimitive.Item>
                            )
                        )}
                    </SelectPrimitive.Group>
                </SelectPrimitive.Viewport>
                <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <CaretDown />
                </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    );
};

export { Select };