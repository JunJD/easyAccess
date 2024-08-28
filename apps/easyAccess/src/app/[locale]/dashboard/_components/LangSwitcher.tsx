'use client'

import { capitalize } from '@easy-access/utils'
import { Globe } from '@phosphor-icons/react'
import { Button } from 'apps/easyAccess/libs/ui/Button'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

const LangSwitcher: React.FC = () => {
    interface Option {
        country: string
        code: string
    }
    const pathname = usePathname()
    const urlSegments = useSelectedLayoutSegments()

    const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)
    
    const options: Option[] = [
        { country: 'English', code: 'en' },
        { country: "中文", code: 'zh' }
    ]

    return (
        <div className='flex items-center justify-center'>
            <div className='relative'>
                <Button
                    className='text-destructive inline-flex w-full items-center justify-between gap-3'
                    size='sm'
                    onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
                    onBlur={() => setIsOptionsExpanded(false)}
                >
                    Language
                    <Globe />
                </Button>
                {isOptionsExpanded && (
                    <div className='absolute right-0 mt-2 w-full origin-top-right rounded-md bg-dropdown shadow-lg'>
                        <div
                            className='py-1'
                            role='menu'
                            aria-orientation='vertical'
                            aria-labelledby='options-menu'
                        >
                            {options.map(lang => {
                                return (
                                    <Link
                                        key={lang.code}
                                        href={`/${lang.code}/${urlSegments.join('/')}`}
                                    >
                                        <button
                                            lang={lang.code}
                                            onMouseDown={e => {
                                                e.preventDefault()
                                            }}
                                            className={`block w-full px-4 py-2 text-left text-sm hover:bg-dropdownHover ${pathname === `/${lang.code}`
                                                ? 'bg-selected text-primary hover:bg-selected'
                                                : 'text-secondary'
                                                }`}
                                        >
                                            {capitalize(lang.country)}
                                        </button>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LangSwitcher