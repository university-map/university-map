import { Route, Routes } from 'react-router-dom';
import SideNavbar from '@/components/Nav/SideNavbar';
import { Home, Map } from '@/components';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <SideNavbar />
      <div style={{ height: '100%', flexGrow: 1, paddingLeft: '50px' }}>
        <Routes>
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/university/:country/:university" element={<Map />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
