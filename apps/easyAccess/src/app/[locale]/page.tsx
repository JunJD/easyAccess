'use client'
import { Button } from 'apps/easyAccess/libs/ui/Button';
import { useTranslations } from 'next-intl';
import { useGlobalStore } from '../../store/global/store'

export default function HomePage() {
    const t = useTranslations('HomePage');
    const [themeMode, switchThemeMode] = useGlobalStore((s) => [
        s.settings.themeMode,
        s.switchThemeMode,
    ]);
    return <Button onClick={() => { switchThemeMode('dark') }} variant={'outline'} size={'lg'}>
        {t('title')}22{themeMode}
    </Button>;
}