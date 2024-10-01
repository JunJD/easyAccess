
import type { Metadata } from 'next'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import { TooltipProvider } from "apps/easyAccess/libs/ui/tooltip"
import './globals.css'
import { ThemeProvider } from './provider/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { MotionConfig } from 'framer-motion'

export const metadata: Metadata = {
  title: '待定 title',
  description: '待定 description!'
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()
  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
      className='scroll-smooth'
      suppressHydrationWarning
    >
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='light'
          themes={[
            'light',
            'dark',
            'instagram',
            'facebook',
            'discord',
            'netflix',
            'twilight',
            'reddit'
          ]}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing='ease'
              speed={500}
              shadow='0 0 10px #c17458,0 0 5px #2299DD'
              color='hsl(var(--primary))'
              showSpinner={true}
            />
            {/* <MotionConfig transition={{ type: 'spring', duration: 0.55 }}> */}
            <TooltipProvider>
              <main className='mx-auto w-full'>{children}</main>
            </TooltipProvider>
            {/* </MotionConfig> */}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}