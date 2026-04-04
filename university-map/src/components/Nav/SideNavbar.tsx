import React, { useState } from 'react';
import { Box, Group, Stack, Tooltip, UnstyledButton, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IoLanguage, IoLogoGithub } from 'react-icons/io5';
import LanguagePicker from './LanguagePicker';
import classes from './SideNavbar.module.css';

interface NavbarLinkProps {
  icon: typeof IoLogoGithub;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} />
      </UnstyledButton>
    </Tooltip>
  );
}

const NAVBAR_SIZE = 50;

const SideNavbar: React.FC = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const links =
    <>
      <NavbarLink
        icon={IoLanguage}
        label='Locale'
        onClick={() => setShowLanguages((s) => !s)}
      />
      <NavbarLink
        icon={IoLogoGithub}
        label='Github'
        onClick={() => { window.location.href = 'https://github.com/university-map/university-map'; }}
      />
    </>
  ;

  return (
    <>
      <Box
        component='nav'
        className={isMobile ? classes.navbarBottom : classes.navbarSide}
        style={isMobile ? {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: NAVBAR_SIZE,
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: rem(4),
        } : {
          position: 'absolute',
          top: 0,
          left: 0,
          width: NAVBAR_SIZE,
          height: '100%',
          zIndex: 500,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isMobile ?
          <Group gap={0}>{links}</Group>
          :
          <Box style={{ position: 'absolute', bottom: 0 }}>
            <Stack justify='center' gap={0}>{links}</Stack>
          </Box>
        }
      </Box>

      {showLanguages &&
        <Box
          style={{
            position: 'absolute',
            zIndex: 600,
            width: 150,
            ...isMobile
              ? { bottom: NAVBAR_SIZE, right: 0 }
              : { bottom: 0, left: NAVBAR_SIZE },
          }}
        >
          <LanguagePicker onChange={() => setShowLanguages(false)} />
        </Box>
      }
    </>
  );
};

export default SideNavbar;
