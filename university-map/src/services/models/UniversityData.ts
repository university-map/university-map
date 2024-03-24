import { LatLngTuple } from 'leaflet';

// public/universities/index.json
class Location {
  constructor(
    public name: string = '',
    public coordinates: LatLngTuple = [0, 0],
  ) {}
}

class UniversityIndex {
  constructor(
    public name: string = '',
    public country: string = '',
    public locations: Location[] = [],
    public acronyms: string[] = [],
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

export { Location, UniversityIndex, UniversityInfo };
