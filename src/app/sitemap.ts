import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';

const BASE = 'https://mm-proverbs.mnote.pp.ua';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const filePath = path.join(process.cwd(), 'public', 'proverbs_data.json');
  const proverbs: { id: string }[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...proverbs.map((p) => ({
      url: `${BASE}/proverb/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
