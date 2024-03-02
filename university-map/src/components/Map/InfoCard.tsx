import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Image, Title } from '@mantine/core';
import InfoCardOverview from './InfoCardOverview';
import { UniversityInfo } from '@/services/models';
import './Map.css';

const InfoCard: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string | null>('overview');

  return (
    <div className='infoCard'>
      <div className='banner'>
        <Image
          sizes='100vw'
          h={240}
          alt='University Banner'
          style={{ objectFit: 'cover' }}
          src={props.universityInfo.banner}
          fallbackSrc='https://placehold.co/400x240/white/gray?text=Not%20Found'
        />
      </div>
      <Title order={2} m='xs'>
        {props.universityInfo.name}
      </Title>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab value='overview'>{t('InfoCard.overview')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='overview'>
          <InfoCardOverview universityInfo={props.universityInfo} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default InfoCard;
