/* eslint-disable  @typescript-eslint/no-explicit-any */
import yaml from 'js-yaml';
import { Location, UniversityIndex, UniversityInfo } from './models';

interface IDataLoader {
  getUnivIndex(): Promise<UniversityIndex[]>
  getUnivInfo(country: string, university: string, locale: string): Promise<UniversityInfo>
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

  public async getUnivIndex(): Promise<UniversityIndex[]> {
    try {
      const response = await fetch(`${DataLoader.Endpoint}/universities/index.json`);
      const data = await response.json();
      const universities: UniversityIndex[] = data.map((univ: any) => {
        const locations: Location[] = univ.locations.map((loc: any) => new Location(loc.name, loc.coordinates));
        return new UniversityIndex(
          univ.directoryName,
          univ.name,
          univ.country,
          locations,
          univ.acronyms
        );
      });
      return universities;
    } catch (error) {
      console.error('Error loading university index:', error);
      return Promise.resolve([]);
    }
  }

  public async getUnivInfo(
    country: string = 'Taiwan',
    directoryName: string = 'National Taiwan University',
    locale: string = 'en'
  ): Promise<UniversityInfo> {
    try {
      let localeData = null;
      if (locale !== 'en') {
        const response = await fetch(`${DataLoader.Endpoint}/universities/${country}/${directoryName}/${locale}.yml`);
        if (response.ok) {
          localeData = yaml.load(await response.text()) as any;
        }
      }

      let enData = null;
      const response = await fetch(`${DataLoader.Endpoint}/universities/${country}/${directoryName}/en.yml`);
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
}

export default DataLoader;
