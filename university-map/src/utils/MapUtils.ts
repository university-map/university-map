import { LatLngTuple } from 'leaflet';

function isSameLatLng(point1: LatLngTuple, point2: LatLngTuple) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}

export { isSameLatLng };
