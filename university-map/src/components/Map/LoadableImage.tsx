import { useState } from 'react';
import { Box, Image, Skeleton, Text } from '@mantine/core';

interface LoadableImageProps {
  src: string;
  h: number;
  alt: string;
}

const LoadableImage = ({ src, h, alt }: LoadableImageProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <Box style={{ position: 'relative', height: h }}>
      {status === 'loading' && <Skeleton height={h} radius={0} />}
      {status === 'error' &&
        <Box
          style={{
            height: h,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--mantine-color-gray-1)',
          }}
        >
          <Text size='sm' c='dimmed'>No Picture</Text>
        </Box>
      }
      <Image
        src={src}
        h={h}
        alt={alt}
        style={{
          objectFit: 'cover',
          display: status === 'error' ? 'none' : 'block',
          opacity: status === 'loaded' ? 1 : 0,
          position: status === 'loaded' ? 'static' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </Box>
  );
};

export default LoadableImage;
