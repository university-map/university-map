/* eslint-disable  @typescript-eslint/no-explicit-any */
import yaml from 'js-yaml';
import { Location, UniversityLocation, UniversityInfo, SearchData } from './models';

interface IDataLoader {
  getUnivLocations(): Promise<UniversityLocation[]>
  getUnivInfo(country: string, university: string, locale: string): Promise<UniversityInfo>
  getSearchData(): Promise<SearchData>
}

class DataLoader implements IDataLoader {
  private static Instance: DataLoader | null = null;
  private static Endpoint: string = '';

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): DataLoader {
    if (!DataLoader.Instance) {
      DataLoader.Instance = new DataLoader();
      DataLoader.Endpoint = window.location.origin;
    }
    return DataLoader.Instance;
  }

  public async getUnivLocations(): Promise<UniversityLocation[]> {
    try {
      const response = await fetch(`${DataLoader.Endpoint}/universities/locations.json`);
      const data = await response.json();
      const universities: UniversityLocation[] = data.map((univ: any) => {
        const locations: Location[] = univ.location.map((loc: any) => new Location(loc.name, loc.coordinates));
        return new UniversityLocation(
          univ.name,
          univ.country,
          locations
        );
      });
      return universities;
    } catch (error) {
      console.error('Error loading locations:', error);
      return Promise.resolve([]);
    }
  }

  public async getUnivInfo(
    country: string = 'Taiwan',
    university: string = 'National Cheng Kung University',
    locale: string = 'en'
  ): Promise<UniversityInfo> {
    try {
      let localeData = null;
      if (locale !== 'en') {
        const response = await fetch(`${DataLoader.Endpoint}/universities/${country}/${university}/${locale}.yml`);
        if (response.ok) {
          localeData = yaml.load(await response.text()) as any;
        }
      }

      let enData = null;
      const response = await fetch(`${DataLoader.Endpoint}/universities/${country}/${university}/en.yml`);
      if (response.ok) {
        enData = yaml.load(await response.text()) as any;
      }

      return new UniversityInfo(
        locale,
        localeData?.name ?? enData?.name ?? '',
        localeData?.address ?? enData?.address ?? '',
        localeData?.website ?? enData?.website ?? '',
        localeData?.banner ?? enData?.banner ?? '',
        localeData?.introduction ?? enData?.introduction ?? '',
        localeData?.gallery ?? enData?.gallery ?? [],
      );
    } catch (error) {
      console.error('Error loading university info:', error);
      return Promise.resolve(new UniversityInfo());
    }
  }

  public async getSearchData(): Promise<SearchData> {
    try {
      const response = await fetch(`${DataLoader.Endpoint}/universities/search.json`);
      const data = await response.json();
      return new SearchData(
        data.universities ?? [],
        data.keywords ?? [],
        data.keyword_index ?? []
      );
    } catch (error) {
      console.error('Error loading search data:', error);
      return Promise.resolve(new SearchData());
    }
  }
}

export default DataLoader;
