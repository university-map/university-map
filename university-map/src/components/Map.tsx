import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from "react-i18next";

const markerIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Map() {
  const { t } = useTranslation();
  return (
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
  );
}

export default Map;
