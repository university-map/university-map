import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SideNavbar from '@/components/Nav/SideNavbar';
import { Map, NotFound } from '@/components';

const NAVBAR_SIZE = 50;

function App() {
  const { i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Box style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <SideNavbar />
      <Box
        style={{
          height: isMobile ? `calc(100% - ${NAVBAR_SIZE}px)` : '100%',
          paddingLeft: isMobile ? 0 : NAVBAR_SIZE,
        }}
      >
        <Routes>
          <Route path='/' element={<Navigate to={`/${i18n.language}/university`} />} />
          <Route path='/:lang' element={<Navigate to={`/${i18n.language}/university`} />} />
          <Route path='/:lang/university' element={<Map />} />
          <Route path='/:lang/university/:country/:university' element={<Map />} />
          <Route path='*' Component={NotFound}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;