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
import { isSameLatLng } from '@/utils';
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

  const showInfoCard = useCallback(async (countryName: string, directoryName: string) => {
    navigate(`/${i18n.language}/university/${countryName}/${directoryName}`);
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
              onMarkerClick={showInfoCard}
            />
          );
        }
      }
      setMarkers(newMarkers);
    };

    const updateMarkers = async (univInfo: UniversityInfo) => {
      setMarkers((markers) => {
        return markers.map((marker) => {
          // Set the markers of the selected university to red,
          // and update the location name regarding locale
          if (marker.props.countryName === country && marker.props.directoryName === university) {
            const matchedLocations = univInfo.locations.filter((loc) => isSameLatLng(loc.coordinates, marker.props.coordinates));
            return React.cloneElement(marker, {
              iconColor: 'red',
              universityName: univInfo.name,
              locationName: matchedLocations.length > 0 ? matchedLocations[0].name : marker.props.locationName
            });
          }

          // Reset the markers of other universities to blue
          return React.cloneElement(marker, {
            iconColor: 'blue'
          });
        });
      });
    };

    const updateMarkersAndSetSelectedUniv = async () => {
      const univInfo = await dataLoader.getUnivInfo(country, university, i18n.language);
      setSelectedUniv(univInfo);
      updateMarkers(univInfo);
    };

    if (markers?.length == 0) {
      initMarkers();
    } else if (country && university) {
      updateMarkersAndSetSelectedUniv();
    }
  }, [country, university, i18n.language, dataLoader, markers?.length, showInfoCard]);

  const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
  const center = JSON.parse(Cookies.get('mapCenter') ?? '[0, 20]');
  const zoom = parseInt(Cookies.get('mapZoom') ?? '3');
  return (
    <main style={{ height: '100vh' }}>
      { country && university ? <InfoCard universityInfo={selectedUniv} /> : null }
      <SearchBar onSearch={showInfoCard} />
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
        {window.innerWidth >= 800 && <ZoomControl position='bottomright' />}
        {markers}
      </MapContainer>
    </main>
  );
}

export default Map;
