import { Button } from 'apps/easyAccess/libs/ui/Button';
import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('HomePage');
    return <Button variant={'outline'} size={'lg'}>{t('title')}</Button>;
}