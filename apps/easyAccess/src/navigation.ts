'use client'
import {
    createLocalizedPathnamesNavigation,
    Pathnames
} from 'next-intl/navigation'
import { locales } from './i18n'

export const localePrefix = 'always'

export const pathnames = {
    '/': '/',
    '/resumes': '/resumes'
    // } satisfies Pathnames<typeof locales>
} as Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })