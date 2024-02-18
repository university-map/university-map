import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Image, Title, Text, Grid, CopyButton, Tooltip, ActionIcon, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { IoIosPin, IoMdCheckbox, IoMdCopy, IoMdHome } from 'react-icons/io';
import { UniversityInfo } from '@/services/models';

interface CopyLineProps {
  icon: typeof IoIosPin;
  text: string;
}

function CopyLine({icon: Icon, text}: CopyLineProps) {
  return (
    <Grid gutter='xs' mx='xs' mt='xs'>
      <Grid.Col span={1}>
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Grid.Col>
      <Grid.Col span={10}>
        <Text lineClamp={1}>
          {text}
        </Text>
      </Grid.Col>
      <Grid.Col span={1}>
        <CopyButton value={text} timeout={2000}>
          {({ copied, copy }) =>
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position='right'>
              <ActionIcon color={copied ? 'teal' : 'gray'} variant='subtle' onClick={copy}>
                {copied ? <IoMdCheckbox style={{ width: rem(24), height: rem(24) }} /> : <IoMdCopy style={{ width: rem(24), height: rem(24) }} />}
              </ActionIcon>
            </Tooltip>
          }
        </CopyButton>
      </Grid.Col>
    </Grid>
  );
}

const InfoCardOverview: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const { t } = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const pictures = props.universityInfo.gallery.length > 0
    ? props.universityInfo.gallery
    : ['https://placehold.co/400x240/white/gray?text=No%20Picture%20Yet'];
  const slides = pictures.map((image, index) =>
    <Carousel.Slide key={index}>
      <Image
        sizes='100vw'
        h={240}
        alt='Gallery Image'
        style={{ objectFit: 'cover' }}
        src={image}
      />
    </Carousel.Slide>
  );

  return (
    <>
      <CopyLine icon={IoIosPin} text={props.universityInfo.address} />
      <CopyLine icon={IoMdHome} text={props.universityInfo.website} />
      <Divider m='xs' />
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
    </>
  );
};

export default InfoCardOverview;
