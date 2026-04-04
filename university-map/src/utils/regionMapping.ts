/** Maps every country in the dataset to its macro-region. */
export const COUNTRY_REGIONS: Record<string, string> = {
  'Australia':          'Oceania',
  'Belgium':            'Europe',
  'Canada':             'North America',
  'China':              'Asia',
  'Denmark':            'Europe',
  'France':             'Europe',
  'Germany':            'Europe',
  'Hong Kong':          'Asia',
  'India':              'Asia',
  'Japan':              'Asia',
  'Netherlands':        'Europe',
  'Russian Federation': 'Europe',
  'Singapore':          'Asia',
  'South Korea':        'Asia',
  'Sweden':             'Europe',
  'Switzerland':        'Europe',
  'Taiwan':             'Asia',
  'United Kingdom':     'Europe',
  'United States':      'North America',
};

export function getRegion(country: string): string {
  return COUNTRY_REGIONS[country] ?? 'Other';
}
