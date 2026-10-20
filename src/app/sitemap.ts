import type { MetadataRoute } from 'next';

import { featuredProjects, site } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.seo.url}/`, lastModified, priority: 1 },
    { url: `${site.seo.url}/resume/`, lastModified, priority: 0.8 },
    ...featuredProjects.map((project) => ({
      url: `${site.seo.url}/work/${project.slug}/`,
      lastModified,
      priority: 0.9,
    })),
  ];
}
