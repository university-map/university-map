import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SideNavbar from '@/components/Nav/SideNavbar';
import { Map, NotFound } from '@/components';

function App() {
  const { i18n } = useTranslation();
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <SideNavbar />
      <div style={{ height: '100%', flexGrow: 1, paddingLeft: '50px' }}>
        <Routes>
          <Route path='/' element={<Navigate to={`/${i18n.language}/university`} />} />
          <Route path='/:lang' element={<Navigate to={`/${i18n.language}/university`} />} />
          <Route path='/:lang/university' element={<Map />} />
          <Route path='/:lang/university/:country/:university' element={<Map />} />
          <Route path='*' Component={NotFound}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
