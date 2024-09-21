'use client'
import {
    createLocalizedPathnamesNavigation,
} from 'next-intl/navigation'
import { Pathnames } from 'next-intl/routing'
import { locales } from './i18n'

export const localePrefix = 'always'

export const pathnames = {
    '/': '/',
    '/dashboard': '/dashboard',
    '/builder': '/builder',
} as Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })