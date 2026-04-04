import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import Cookies from 'js-cookie';
import { Anchor, Box, Paper, Text } from '@mantine/core';
import MapMarker from './Map/MapMarker';
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';
import { isSameLatLng } from '@/utils';
import 'leaflet/dist/leaflet.css';

const MapController = () => {
  const map = useMap();
  Cookies.set('mapCenter', JSON.stringify(map.getCenter()), { expires: 1 / 24, path: '/' });
  Cookies.set('mapZoom', map.getZoom().toString(), { expires: 1 / 24, path: '/' });
  return <></>;
};

function EmbedMap() {
  const { country, university } = useParams();
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([] as JSX.Element[]);
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const { t, i18n } = useTranslation();
  const dataLoader = DataLoader.getInstance();

  const onMarkerClick = useCallback((countryName: string, directoryName: string) => {
    navigate(`/${i18n.language}/embed/${countryName}/${directoryName}`);
  }, [i18n.language, navigate]);

  useEffect(() => {
    const initMarkers = async () => {
      const univIndex = await dataLoader.getUnivIndex();
      const newMarkers = [];
      for (const univ of univIndex) {
        for (const location of univ.locations) {
          const isSelected = country === univ.country && university === univ.name;
          newMarkers.push(
            <MapMarker
              key={`${univ.country}+${univ.name}+${location.name}`}
              countryName={univ.country}
              directoryName={univ.directoryName}
              coordinates={location.coordinates}
              universityName={univ.name}
              locationName={location.name}
              iconColor={isSelected ? 'red' : 'blue'}
              onMarkerClick={onMarkerClick}
            />
          );
        }
      }
      setMarkers(newMarkers);
    };

    const updateMarkers = (univInfo: UniversityInfo) => {
      setMarkers((prev) =>
        prev.map((marker) => {
          if (marker.props.countryName === country && marker.props.directoryName === university) {
            const matched = univInfo.locations.filter((loc) =>
              isSameLatLng(loc.coordinates, marker.props.coordinates)
            );
            return React.cloneElement(marker, {
              iconColor: 'red',
              universityName: univInfo.name,
              locationName: matched.length > 0 ? matched[0].name : marker.props.locationName,
            });
          }
          return React.cloneElement(marker, { iconColor: 'blue' });
        })
      );
    };

    const loadSelected = async () => {
      const univInfo = await dataLoader.getUnivInfo(country, university, i18n.language);
      setSelectedUniv(univInfo);
      updateMarkers(univInfo);
    };

    if (markers.length === 0) {
      initMarkers();
    } else if (country && university) {
      loadSelected();
    }
  }, [country, university, i18n.language, dataLoader, markers.length, onMarkerClick]);

  const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
  const center = JSON.parse(Cookies.get('mapCenter') ?? '[0, 20]');
  const zoom = parseInt(Cookies.get('mapZoom') ?? '3');
  const showPanel = !!(country && university);

  // Build a full-map link that opens in the parent browsing context
  const fullMapUrl = `${window.location.origin}${window.location.pathname}#/${i18n.language}/university/${country}/${university}`;

  return (
    <Box style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {showPanel &&
        <Paper
          shadow='md'
          p='xs'
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 500,
            maxWidth: 320,
            width: 'max-content',
            textAlign: 'center',
            pointerEvents: 'auto',
          }}
        >
          <Text fw={600} size='sm' lineClamp={1}>
            {selectedUniv.name}
          </Text>
          <Anchor href={fullMapUrl} target='_blank' size='xs'>
            {t('Home.openInApp')}
          </Anchor>
        </Paper>
      }

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%' }}
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
    </Box>
  );
}

export default EmbedMap;
