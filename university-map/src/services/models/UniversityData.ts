import { LatLngTuple } from 'leaflet';

// public/universities/locations.json
class Location {
  constructor(
    public name: string = '',
    public coordinates: LatLngTuple = [0, 0],
  ) {}
}

class UniversityLocation {
  constructor(
    public name: string = '',
    public country: string = '',
    public locations: Location[] = [],
  ) {}
}

// public/universities/{country}/{university}/{locale}.yml
class UniversityInfo {
  constructor(
    public locale: string = '',
    public name: string = '',
    public address: string = '',
    public website: string = '',
    public banner: string = '',
    public introduction: string = '',
    public gallery: string[] = [],
  ) {}
}

export { Location, UniversityLocation, UniversityInfo };
