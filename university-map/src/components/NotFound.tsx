import { useTranslation } from 'react-i18next';
import { Title, Text } from '@mantine/core';

function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <Title order={1} m='xs'>404 - Not Found</Title>
      <Text m='xs'>{t('notFoundText')}</Text>
    </>
  );
}

export default NotFound;
