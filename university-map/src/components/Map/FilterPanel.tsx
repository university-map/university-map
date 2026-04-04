import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon, Badge, Box, Button, MultiSelect, Paper, Stack, Text, Tooltip,
} from '@mantine/core';
import { IoFilter } from 'react-icons/io5';
import { COUNTRY_REGIONS } from '@/utils';

export interface FilterState {
  countries: string[];
  regions: string[];
}

interface FilterPanelProps {
  availableCountries: string[];
  filter: FilterState;
  onChange: (filter: FilterState) => void;
}

const ALL_REGIONS = Array.from(new Set(Object.values(COUNTRY_REGIONS))).sort();

export default function FilterPanel({ availableCountries, filter, onChange }: FilterPanelProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const activeCount = filter.countries.length + filter.regions.length;
  const sortedCountries = [...availableCountries].sort();

  function clear() {
    onChange({ countries: [], regions: [] });
  }

  return (
    <Box style={{ position: 'relative', flexShrink: 0 }}>
      <Tooltip label={t('Filter.title')} position='bottom' transitionProps={{ duration: 0 }}>
        <ActionIcon
          size='lg'
          variant={activeCount > 0 ? 'filled' : 'default'}
          color={activeCount > 0 ? 'blue' : undefined}
          onClick={() => setOpen((o: boolean) => !o)}
          aria-label={t('Filter.title')}
        >
          <IoFilter />
          {activeCount > 0 &&
            <Badge
              size='xs'
              circle
              color='red'
              style={{ position: 'absolute', top: -4, right: -4 }}
            >
              {activeCount}
            </Badge>
          }
        </ActionIcon>
      </Tooltip>

      {open &&
        <Paper
          shadow='md'
          p='sm'
          w={280}
          withBorder
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            zIndex: 510,
          }}
        >
          <Stack gap='xs'>
            <Text fw={600} size='sm'>{t('Filter.title')}</Text>

            <MultiSelect
              label={t('Filter.region')}
              placeholder={t('Filter.all')}
              data={ALL_REGIONS}
              value={filter.regions}
              onChange={(regions) => onChange({ ...filter, regions })}
              clearable
              size='xs'
              comboboxProps={{ withinPortal: false }}
            />

            <MultiSelect
              label={t('Filter.country')}
              placeholder={t('Filter.all')}
              data={sortedCountries}
              value={filter.countries}
              onChange={(countries) => onChange({ ...filter, countries })}
              clearable
              searchable
              size='xs'
              comboboxProps={{ withinPortal: false }}
            />

            {activeCount > 0 &&
              <Button size='xs' variant='subtle' color='red' onClick={clear}>
                {t('Filter.clear')}
              </Button>
            }
          </Stack>
        </Paper>
      }
    </Box>
  );
}
