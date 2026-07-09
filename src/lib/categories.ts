// Client-safe treatment nav data (no fs imports) for the header dropdown and footer.
import treatmentsData from '../../content/treatments.json';

export const categories = treatmentsData.categories
  .filter((c) => !('hidden' in c && c.hidden))
  .map((c) => ({
    slug: c.slug,
    title: c.title,
    menuLabel: c.menuLabel,
    treatments: c.treatments.map((t) => ({ slug: t.slug, name: t.name })),
  }));
