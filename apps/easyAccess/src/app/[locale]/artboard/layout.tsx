

import { Providers } from './providers';


export default function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    return (
        <Providers>
            {children}
        </Providers>
    )
}