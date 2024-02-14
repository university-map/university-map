import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Image, Title, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { UniversityInfo } from '@/services/models';

const InfoCardOverview: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const { t } = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const slides = props.universityInfo.gallery.map((image, index) =>
    <Carousel.Slide key={index}>
      <Image
        sizes='100vw'
        alt='Gallery Image'
        style={{ objectFit: 'cover' }}
        src={image}
      />
    </Carousel.Slide>
  );

  return (
    <div>
      <Text lineClamp={12} m='xs'>
        {props.universityInfo.introduction}
      </Text>
      <Divider m='xs' />
      <Title order={3} m='xs'>
        {t('InfoCard.gallery')}
      </Title>
      <Carousel
        loop
        height={240}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default InfoCardOverview;
