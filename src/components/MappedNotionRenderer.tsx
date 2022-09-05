import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { defaultMapImageUrl, MapImageUrlFn, NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m: any) => m.Code));

interface NotionRenderer {
  recordMap: ExtendedRecordMap;
}

export default function MappedNotionRenderer({ recordMap }: NotionRenderer) {
  const mapImageUrl: MapImageUrlFn = (url, block) => {
    const u = new URL(url);

    if (u.pathname.startsWith('/secure.notion-static.com') && u.hostname.endsWith('.amazonaws.com')) {
      if (
        u.searchParams.has('X-Amz-Credential') &&
        u.searchParams.has('X-Amz-Signature') &&
        u.searchParams.has('X-Amz-Algorithm')
      ) {
        url = '/image/' + encodeURIComponent(url);
      }
    }

    return defaultMapImageUrl(url, block)!;
  };

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={true}
      components={{
        Code,
        nextImage: Image,
        nextLink: Link,
      }}
      mapImageUrl={mapImageUrl}
    />
  );
}
