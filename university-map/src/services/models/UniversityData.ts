import { LatLngTuple } from 'leaflet';

// public/universities/index.json
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

// public/universities/search.json
class SearchData {
  constructor(
    public universities: [country: string, university: string][] = [],
    public keywords: string[] = [],
    public keywordIndex: number[] = [],
  ) {}
}

export { Location, UniversityLocation, UniversityInfo, SearchData };
