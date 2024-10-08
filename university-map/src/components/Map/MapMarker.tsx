import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const blueIcon = new L.Icon({
  iconUrl: '/leaflet-color-markers/marker-icon-blue.png',
  shadowUrl: '/leaflet-color-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: '/leaflet-color-markers/marker-icon-red.png',
  shadowUrl: '/leaflet-color-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapMarkerProps {
  countryName: string;
  directoryName: string;
  coordinates: L.LatLngTuple;
  universityName: string;
  locationName: string;
  iconColor: string;
  onMarkerClick: (country: string, universityName: string, locationName: string) => void;
}

const MapMarker = (props: MapMarkerProps) => {
  return (
    <Marker
      position={props.coordinates}
      icon={props.iconColor === 'red' ? redIcon : blueIcon}
      eventHandlers={{
        click: () => {
          props.onMarkerClick(props.countryName, props.directoryName, props.locationName);
        },
      }}
    >
      <Popup>
        <div style={{ textAlign: 'center' }}>
          {props.universityName}
          <br />
          {props.locationName}
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
