import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SideNavbar from '@/components/Nav/SideNavbar';
import { EmbedMap, Home, Map, NotFound } from '@/components';

const NAVBAR_SIZE = 50;

/** Normal app layout with sidebar */
function MainLayout() {
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
          <Route path='/' element={<Navigate to={`/${i18n.language}/home`} />} />
          <Route path='/:lang' element={<Navigate to={`/${i18n.language}/home`} />} />
          <Route path='/:lang/home' element={<Home />} />
          <Route path='/:lang/university' element={<Map />} />
          <Route path='/:lang/university/:country/:university' element={<Map />} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Routes>
      {/* Embed routes — no app chrome, safe to use in <iframe> */}
      <Route path='/:lang/embed' element={<EmbedMap />} />
      <Route path='/:lang/embed/:country/:university' element={<EmbedMap />} />
      {/* Everything else uses the main layout */}
      <Route path='*' element={<MainLayout />} />
    </Routes>
  );
}

export default App;
