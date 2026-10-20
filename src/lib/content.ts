import fs from 'node:fs';
import path from 'node:path';

import projectsJson from '@content/projects.json';
import siteJson from '@content/site.json';

import type {
  Category,
  Environment,
  MediaItem,
  MoreProject,
  Project,
  Site,
  Status,
} from './types';

/**
 * Content is validated once, at module load, so `next build` fails loudly if a
 * content file drifts from the types or points at a file that is not there.
 */

const CATEGORIES: Category[] = [
  'Robotics & Control',
  'Perception & Vision',
  'AI Systems',
  'Embedded & Hardware',
  'Machine Learning',
];
const ENVIRONMENTS: Environment[] = ['Simulation', 'Real hardware', 'Both', 'Software only'];
const STATUSES: Status[] = ['Complete', 'In progress', 'Paper in preparation', 'Published'];

function fail(where: string, message: string): never {
  throw new Error(`content error in ${where}: ${message}`);
}

function str(value: unknown, where: string): string {
  if (typeof value !== 'string' || value.trim() === '') fail(where, 'expected a non-empty string');
  return value as string;
}

function strArray(value: unknown, where: string): string[] {
  if (!Array.isArray(value) || value.length === 0) fail(where, 'expected a non-empty array');
  return value.map((item, i) => str(item, `${where}[${i}]`));
}

function oneOf<T extends string>(value: unknown, allowed: T[], where: string): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    fail(where, `expected one of ${allowed.join(' | ')}, got ${String(value)}`);
  }
  return value as T;
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function assetExists(src: string, where: string): string {
  if (!src.startsWith('/')) fail(where, `media path must start with "/", got ${src}`);
  if (!fs.existsSync(path.join(PUBLIC_DIR, src))) fail(where, `missing file public${src}`);
  return src;
}

function media(value: unknown, where: string): MediaItem {
  const raw = value as Record<string, unknown>;
  const type = oneOf(raw.type, ['image', 'video'] as const, `${where}.type`);
  const item: MediaItem = {
    type,
    src: assetExists(str(raw.src, `${where}.src`), `${where}.src`),
    alt: str(raw.alt, `${where}.alt`),
    width: Number(raw.width),
    height: Number(raw.height),
  };
  if (!Number.isFinite(item.width) || !Number.isFinite(item.height)) {
    fail(where, 'width and height must be numbers');
  }
  if (typeof raw.poster === 'string') item.poster = assetExists(raw.poster, `${where}.poster`);
  if (type === 'video' && !item.poster) fail(where, 'a video needs a poster frame');
  if (typeof raw.caption === 'string') item.caption = raw.caption;
  return item;
}

function project(value: unknown, index: number): Project {
  const raw = value as Record<string, unknown>;
  const where = `projects.featured[${index}]`;
  const slug = str(raw.slug, `${where}.slug`);
  const mediaRaw = raw.media as Record<string, unknown>;
  const gallery = Array.isArray(mediaRaw?.gallery) ? mediaRaw.gallery : [];
  const tagline = str(raw.tagline, `${where}.tagline`);
  if (tagline.split(/\s+/).length > 10) fail(`${where}.tagline`, 'max 10 words');

  return {
    slug,
    title: str(raw.title, `${where}.title`),
    tagline,
    category: oneOf(raw.category, CATEGORIES, `${where}.category`),
    featured: raw.featured === true,
    rank: Number(raw.rank),
    date: str(raw.date, `${where}.date`),
    timeline: str(raw.timeline, `${where}.timeline`),
    oneLineProblem: str(raw.oneLineProblem, `${where}.oneLineProblem`),
    problem: str(raw.problem, `${where}.problem`),
    constraints: strArray(raw.constraints, `${where}.constraints`),
    approach: (raw.approach as unknown[]).map((d, i) => {
      const item = d as Record<string, unknown>;
      return {
        decision: str(item.decision, `${where}.approach[${i}].decision`),
        why: str(item.why, `${where}.approach[${i}].why`),
      };
    }),
    architecture: {
      summary: str((raw.architecture as Record<string, unknown>).summary, `${where}.architecture.summary`),
      stages: ((raw.architecture as Record<string, unknown>).stages as unknown[]).map((s, i) => {
        const stage = s as Record<string, unknown>;
        return {
          title: str(stage.title, `${where}.architecture.stages[${i}].title`),
          items: strArray(stage.items, `${where}.architecture.stages[${i}].items`),
        };
      }),
    },
    results: (raw.results as unknown[]).map((r, i) => {
      const item = r as Record<string, unknown>;
      return {
        label: str(item.label, `${where}.results[${i}].label`),
        value: str(item.value, `${where}.results[${i}].value`),
        unit: typeof item.unit === 'string' ? item.unit : '',
        context: str(item.context, `${where}.results[${i}].context`),
        headline: item.headline === true,
      };
    }),
    failures: (raw.failures as unknown[]).map((f, i) => {
      const item = f as Record<string, unknown>;
      return {
        what: str(item.what, `${where}.failures[${i}].what`),
        fix: str(item.fix, `${where}.failures[${i}].fix`),
      };
    }),
    myRole: str(raw.myRole, `${where}.myRole`),
    teamSize: Number(raw.teamSize),
    environment: oneOf(raw.environment, ENVIRONMENTS, `${where}.environment`),
    status: oneOf(raw.status, STATUSES, `${where}.status`),
    stack: strArray(raw.stack, `${where}.stack`).slice(0, 8),
    media: {
      hero: media(mediaRaw.hero, `${where}.media.hero`),
      gallery: gallery.map((g, i) => media(g, `${where}.media.gallery[${i}]`)),
    },
    links: (raw.links ?? {}) as Project['links'],
    next: strArray(raw.next, `${where}.next`),
    ...(Array.isArray(raw.pinnedStory)
      ? {
          pinnedStory: raw.pinnedStory.map((s, i) => {
            const step = s as Record<string, unknown>;
            return {
              label: str(step.label, `${where}.pinnedStory[${i}].label`),
              title: str(step.title, `${where}.pinnedStory[${i}].title`),
              body: str(step.body, `${where}.pinnedStory[${i}].body`),
            };
          }),
        }
      : {}),
  };
}

const featured: Project[] = (projectsJson.featured as unknown[])
  .map(project)
  .sort((a, b) => a.rank - b.rank);

if (featured.length < 4 || featured.length > 6) {
  fail('projects.featured', `expected 4 to 6 featured projects, got ${featured.length}`);
}

const more: MoreProject[] = (projectsJson.more as unknown[]).map((value, index) => {
  const raw = value as Record<string, unknown>;
  const where = `projects.more[${index}]`;
  return {
    slug: str(raw.slug, `${where}.slug`),
    title: str(raw.title, `${where}.title`),
    line: str(raw.line, `${where}.line`),
    stack: strArray(raw.stack, `${where}.stack`),
    status: str(raw.status, `${where}.status`),
    note: str(raw.note, `${where}.note`),
  };
});

const site = siteJson as Site;
assetExists(site.resumePdf, 'site.resumePdf');

const BANNED = [
  'passionate',
  'enthusiast',
  'aspiring',
  'hardworking',
  'leveraged',
  'cutting-edge',
  'seamless',
  'placeholder',
  'lorem',
  'example.com',
];
const haystack = JSON.stringify({ featured, more, site }).toLowerCase();
for (const word of BANNED) {
  if (haystack.includes(word)) fail('content', `banned word "${word}" found`);
}

export { featured as featuredProjects, more as moreProjects, site };

export function projectBySlug(slug: string): Project {
  const found = featured.find((p) => p.slug === slug);
  if (!found) fail('projectBySlug', `no featured project with slug ${slug}`);
  return found;
}

export function nextProject(slug: string): Project {
  const index = featured.findIndex((p) => p.slug === slug);
  return featured[(index + 1) % featured.length] as Project;
}
