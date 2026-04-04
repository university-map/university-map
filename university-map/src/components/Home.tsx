import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Anchor, Box, Button, Code, CopyButton, Paper, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IoMap, IoCopy, IoCheckmark } from 'react-icons/io5';

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const embedUrl = `${window.location.origin}${window.location.pathname}#/${i18n.language}/embed`;
  const iframeSnippet = `<iframe\n  src="${embedUrl}"\n  width="800"\n  height="500"\n  style="border:none;border-radius:8px"\n  loading="lazy"\n  allowfullscreen\n></iframe>`;

  return (
    <Box p='xl' style={{ height: '100%', overflowY: 'auto' }}>
      <Stack gap='xl' maw={860} mx='auto'>

        {/* Hero */}
        <Stack gap='xs'>
          <Title>University Map</Title>
          <Text c='dimmed' size='lg'>
            {t('Home.tagline')}
          </Text>
          <Button
            leftSection={<IoMap />}
            w='fit-content'
            onClick={() => navigate(`/${i18n.language}/university`)}
          >
            {t('Home.openMap')}
          </Button>
        </Stack>

        {/* Live embed preview */}
        <Stack gap='xs'>
          <Title order={2}>{t('Home.previewTitle')}</Title>
          <Box
            style={{
              borderRadius: 'var(--mantine-radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--mantine-shadow-md)',
              lineHeight: 0,
            }}
          >
            <iframe
              src={embedUrl}
              width='100%'
              height='420'
              style={{ border: 'none', display: 'block' }}
              loading='lazy'
              title='University Map embed preview'
            />
          </Box>
        </Stack>

        {/* Embed snippet */}
        <Stack gap='xs'>
          <Title order={2}>{t('Home.embedTitle')}</Title>
          <Text c='dimmed' size='sm'>
            {/* <1> → first Code, <3> → second Code (Trans counts text nodes too) */}
            <Trans i18nKey='Home.embedDescription'>
              Copy the HTML below and paste it into your webpage.
              Append <Code>/Country/University</Code> to the <Code>src</Code> URL to set a default, e.g.:
            </Trans>
          </Text>
          <Text c='dimmed' size='sm'>
            <Code>{`${embedUrl}/United%20States/University%20of%20Southern%20California`}</Code>
          </Text>

          <Paper withBorder p='sm' style={{ position: 'relative' }}>
            <Code block style={{ whiteSpace: 'pre', fontSize: 13 }}>
              {iframeSnippet}
            </Code>
            <CopyButton value={iframeSnippet} timeout={2000}>
              {({ copied, copy }) =>
                <Tooltip label={copied ? t('Home.copied') : t('Home.copyEmbed')} position='left'>
                  <Button
                    size='xs'
                    variant='light'
                    color={copied ? 'teal' : 'gray'}
                    leftSection={copied ? <IoCheckmark /> : <IoCopy />}
                    style={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={copy}
                  >
                    {copied ? t('Home.copied') : t('Home.copyEmbed')}
                  </Button>
                </Tooltip>
              }
            </CopyButton>
          </Paper>
        </Stack>

        <Text size='xs' c='dimmed'>
          {t('Home.dataSource')}
          <Anchor href='https://github.com/university-map/university-map' target='_blank' size='xs'>
            GitHub
          </Anchor>
        </Text>
      </Stack>
    </Box>
  );
}

export default Home;
