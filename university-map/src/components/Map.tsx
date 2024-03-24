import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import Cookies from 'js-cookie';
import InfoCard from './Map/InfoCard';
import SearchBar from './Map/SearchBar';
import MapMarker from './Map/MapMarker';
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';
import 'leaflet/dist/leaflet.css';

const MapController = () => {
  const map = useMap();
  Cookies.set('mapCenter', JSON.stringify(map.getCenter()), {
    expires: 1 / 24, // 1 hour
    path: '/',
  });
  Cookies.set('mapZoom', map.getZoom().toString(), {
    expires: 1 / 24, // 1 hour
    path: '/',
  });
  return <></>;
};

function Map() {
  const { country, university } = useParams();
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([] as JSX.Element[]);
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const { i18n } = useTranslation();
  const dataLoader = DataLoader.getInstance();

  const showUniversity = useCallback(async (countryName: string, universityName: string) => {
    const univInfo = await dataLoader.getUnivInfo(countryName, universityName, i18n.language);
    navigate(`/${i18n.language}/university/${countryName}/${universityName}`);
    setSelectedUniv(univInfo);
    setMarkers((prevMarkers) => {
      return prevMarkers.map((marker) => {
        return React.cloneElement(marker, {
          iconColor: marker.props.countryName === countryName && marker.props.universityName === universityName ? 'red' : 'blue'
        });
      });
    });
  }, [dataLoader, i18n.language, navigate]);

  useEffect(() => {
    const initMarkers = async () => {
      if (markers?.length != 0) {
        // Already initialized
        return;
      }
      const univIndex = await dataLoader.getUnivIndex();
      const newMarkers = [];
      for (const univ of univIndex) {
        for (const location of univ.locations) {
          const isSelected = country === univ.country && university === univ.name;
          newMarkers.push(
            <MapMarker
              key={`${univ.country}+${univ.name}+${location.name}`}
              filename={univ.filename}
              countryName={univ.country}
              universityName={univ.name}
              coordinates={location.coordinates}
              locationName={location.name}
              iconColor={isSelected ? 'red' : 'blue'}
              onMarkerClick={showUniversity}
            />
          );
        }
      }
      setMarkers(newMarkers);
    };

    initMarkers();
    if (country && university) {
      dataLoader.getUnivInfo(country, university, i18n.language).then((univInfo) => setSelectedUniv(univInfo));
    }
  }, [country, university, i18n.language, dataLoader, markers?.length, showUniversity]);

  const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
  const center = JSON.parse(Cookies.get('mapCenter') ?? '[0, 20]');
  const zoom = parseInt(Cookies.get('mapZoom') ?? '3');
  return (
    <main style={{ height: '100vh' }}>
      { country && university ? <InfoCard universityInfo={selectedUniv} /> : null }
      <SearchBar onSearch={showUniversity} />
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%' }}
        /* use bottomright zoom control instead */
        zoomControl={false}
        maxBounds={bounds}
        minZoom={2}
      >
        <MapController />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        {markers}
      </MapContainer>
    </main>
  );
}

export default Map;
