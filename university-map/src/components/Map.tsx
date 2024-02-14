import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import InfoCard from './InfoCard/InfoCard';
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: '/leaflet-color-markers/marker-icon-2x-blue.png',
  shadowUrl: '/leaflet-color-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Map() {
  const { t } = useTranslation();
  const { lang, country, university } = useParams();
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const dataLoader = DataLoader.getInstance();
  const updateRoute = async (country: string, universityName: string): Promise<void> => {
    const univInfo = await dataLoader.getUnivInfo(country, universityName);
    setSelectedUniv(univInfo);
  };

  useEffect(() => {
    updateRoute(country!, university!);
  }, [country, university, updateRoute]);

  console.log(lang, country, university);
  return (
    <main style={{ height: '100vh'}}>
      <InfoCard universityInfo={selectedUniv} />
      <MapContainer
        center={[22.996900745680346, 120.21685639625197]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%' }}
        /* use bottomright zoom control instead */
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        <Marker position={[22.996900745680346, 120.21685639625197]} icon={markerIcon} >
          <Popup>
            {t('InfoCard.overview')}
          </Popup>
        </Marker>
      </MapContainer>
    </main>
  );
}

export default Map;
