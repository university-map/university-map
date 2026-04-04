import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import Cookies from 'js-cookie';
import { Box, CloseButton, Flex, Paper, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import InfoCard from './Map/InfoCard';
import SearchBar from './Map/SearchBar';
import MapMarker from './Map/MapMarker';
import FilterPanel, { FilterState } from './Map/FilterPanel';
import DataLoader from '@/services/DataLoader';
import { UniversityIndex, UniversityInfo } from '@/services/models';
import { getRegion, isSameLatLng } from '@/utils';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';

const INFO_CARD_WIDTH = 400;

const MapController = () => {
  const map = useMap();
  Cookies.set('mapCenter', JSON.stringify(map.getCenter()), {
    expires: 1 / 24,
    path: '/',
  });
  Cookies.set('mapZoom', map.getZoom().toString(), {
    expires: 1 / 24,
    path: '/',
  });
  return <></>;
};

function Map() {
  const { country, university } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const dataLoader = DataLoader.getInstance();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [univIndex, setUnivIndex] = useState<UniversityIndex[]>([]);
  const [selectedUniv, setSelectedUniv] = useState(new UniversityInfo());
  const [filter, setFilter] = useState<FilterState>({ countries: [], regions: [] });

  const showInfoCard = useCallback((countryName: string, directoryName: string) => {
    navigate(`/${i18n.language}/university/${countryName}/${directoryName}`);
  }, [i18n.language, navigate]);

  // Load index once
  useEffect(() => {
    dataLoader.getUnivIndex().then(setUnivIndex);
  }, [dataLoader]);

  // Load selected university info when route changes
  useEffect(() => {
    if (country && university) {
      dataLoader.getUnivInfo(country, university, i18n.language).then(setSelectedUniv);
    }
  }, [country, university, i18n.language, dataLoader]);

  // Derive unique country list for filter UI
  const availableCountries = useMemo(
    () => Array.from(new Set(univIndex.map((u) => u.country))),
    [univIndex]
  );

  // Filter index, then build markers
  const filteredIndex = useMemo(() => {
    if (filter.countries.length === 0 && filter.regions.length === 0) return univIndex;
    return univIndex.filter((u) => {
      const countryOk = filter.countries.length === 0 || filter.countries.includes(u.country);
      const regionOk = filter.regions.length === 0 || filter.regions.includes(getRegion(u.country));
      return countryOk && regionOk;
    });
  }, [univIndex, filter]);

  const markers = useMemo(() =>
    filteredIndex.flatMap((univ) =>
      univ.locations.map((location) => {
        const isSelected = country === univ.country && university === univ.directoryName;
        return (
          <MapMarker
            key={`${univ.country}+${univ.name}+${location.name}`}
            countryName={univ.country}
            directoryName={univ.directoryName}
            coordinates={location.coordinates}
            universityName={
              isSelected && selectedUniv.name ? selectedUniv.name : univ.name
            }
            locationName={
              isSelected && selectedUniv.locations.length > 0
                ? selectedUniv.locations.find((l) => isSameLatLng(l.coordinates, location.coordinates))?.name ?? location.name
                : location.name
            }
            iconColor={isSelected ? 'red' : 'blue'}
            onMarkerClick={showInfoCard}
          />
        );
      })
    ),
  [filteredIndex, country, university, selectedUniv, showInfoCard]
  );

  const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
  const center = JSON.parse(Cookies.get('mapCenter') ?? '[0, 20]');
  const zoom = parseInt(Cookies.get('mapZoom') ?? '3');
  const showPanel = !!(country && university);

  return (
    <Box style={{ height: '100%', position: 'relative' }}>
      {/* Desktop: side panel */}
      {!isMobile && showPanel &&
        <Paper
          radius={0}
          shadow='md'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 500,
            width: INFO_CARD_WIDTH,
            height: '100%',
          }}
        >
          <ScrollArea h='100%'>
            <InfoCard universityInfo={selectedUniv} />
          </ScrollArea>
        </Paper>
      }

      {/* Mobile: bottom sheet */}
      {isMobile && showPanel &&
        <Paper
          shadow='xl'
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55vh',
            zIndex: 490,
            borderRadius: 'var(--mantine-radius-lg) var(--mantine-radius-lg) 0 0',
            overflow: 'hidden',
          }}
        >
          <CloseButton
            size='md'
            style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
            onClick={() => navigate(`/${i18n.language}/university`)}
          />
          <ScrollArea h='100%'>
            <InfoCard universityInfo={selectedUniv} />
          </ScrollArea>
        </Paper>
      }

      <Paper
        withBorder
        shadow='md'
        radius='md'
        p={6}
        px={8}
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 500,
          width: 'min(580px, calc(100vw - 24px))',
          backgroundColor: 'var(--mantine-color-body)',
          overflow: 'visible',
        }}
      >
        <Flex gap='sm' align='center' wrap='nowrap' style={{ width: '100%' }}>
          <FilterPanel
            availableCountries={availableCountries}
            filter={filter}
            onChange={setFilter}
          />
          <Box style={{ flex: 1, minWidth: 0 }}>
            <SearchBar onSearch={showInfoCard} />
          </Box>
        </Flex>
      </Paper>

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
        {window.innerWidth >= 800 && <ZoomControl position='bottomright' />}
        <MarkerClusterGroup chunkedLoading>
          {markers}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
}

export default Map;
