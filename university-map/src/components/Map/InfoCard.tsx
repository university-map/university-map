import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Title } from '@mantine/core';
import InfoCardOverview from './InfoCardOverview';
import LoadableImage from './LoadableImage';
import { UniversityInfo } from '@/services/models';

const InfoCard: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string | null>('overview');

  return (
    <>
      <LoadableImage src={props.universityInfo.banner} h={240} alt='University Banner' />
      <Title order={2} m='xs'>
        {props.universityInfo.name}
      </Title>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='overview'>{t('InfoCard.overview')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='overview'>
          <InfoCardOverview universityInfo={props.universityInfo} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default InfoCard;
