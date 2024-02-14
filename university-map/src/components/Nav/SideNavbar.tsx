import React, { useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IoLanguage, IoLogoGithub } from 'react-icons/io5';
import LanguagePicker from './LanguagePicker';
import './SideNavbar.css';

interface NavbarLinkProps {
  icon: typeof IoLogoGithub;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className='link' data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} />
      </UnstyledButton>
    </Tooltip>
  );
}

const SideNavbar: React.FC = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  return (
    <>
      <nav className='navbar'>
        <div className='bottomNav'>
          <Stack justify="center" gap={0}>
            <NavbarLink icon={IoLanguage} label="Locale" onClick={() => { setShowLanguages((isShow) => !isShow); }} />
            <NavbarLink icon={IoLogoGithub} label="Github" onClick={() => { window.location.href = 'https://github.com'; }} />
          </Stack>
        </div>
      </nav>
      {showLanguages &&
        <div className='languagePanel'>
          <LanguagePicker />
        </div>
      }
    </>
  );
};

export default SideNavbar;
