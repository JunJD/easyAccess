import { Button } from 'apps/easyAccess/libs/ui/Button';
import { useTranslations } from 'next-intl';
import ThemeSwitch from './_components/ThemeSwitch';
import LangSwitcher from './_components/LangSwitcher';

export default function HomePage() {
    const t = useTranslations('HomePage');
    return <>
        <Button variant={'outline'} size={'lg'}>
            {t('title')}
        </Button>
        <ThemeSwitch />
        <LangSwitcher />
    </>;
}