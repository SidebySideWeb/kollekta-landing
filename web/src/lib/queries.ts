import { client } from './sanity';
import { cachedSanityQuery } from './sanity-cache';
import type { ContentPage, HomePage, NotFoundPage, SiteSettings } from './types';

const siteSettingsFields = `{
  siteName,
  tagline,
  footerDescription,
  navLinks[]{ label, href },
  headerCtaLabel,
  headerCtaHref,
  productLinks[]{ label, href },
  companyLinks[]{ label, href },
  legalLinks[]{ label, href },
  copyright,
  studioCredit,
  studioCreditHref
}`;

const homePageFields = `{
  heroBadge, heroTitle, heroDescription, heroPrimaryCta, heroSecondaryCta,
  heroTrustLine, heroMockupDomain, heroMockupCollection,
  problemEyebrow, problemTitle,
  problemCards[]{ icon, title, description, footer, footerTone },
  audienceEyebrow, audienceTitle,
  audienceCards[]{ icon, title, description },
  solutionEyebrow, solutionTitle,
  solutionSteps[]{ number, title, description },
  featuresEyebrow, featuresTitle,
  features[]{ code, category, badge, title, description, visual },
  statEyebrow, statValue, statLabel, statDescription, statDisclaimer,
  whiteLabelEyebrow, whiteLabelTitle, whiteLabelDescription,
  securityEyebrow, securityTitle,
  securityItems[]{ icon, title, description },
  pricingEyebrow, pricingTitle,
  pricingPlans[]{
    name, price, period, billingNote, tagline,
    features[]{ text, emphasize, soonBadge },
    ctaLabel, highlighted, highlightLabel
  },
  pricingOfferBanner,
  foundingEyebrow, foundingTitle, foundingDescription,
  contactTitle, contactDescription, contactSuccessTitle, contactSuccessDescription,
  seo{ title, description, noIndex }
}`;

const notFoundFields = `{
  badge, title, description, statusTag, errorCode,
  primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref,
  helpLinks[]{ icon, title, description, href },
  seo{ title, description, noIndex }
}`;

const contentPageFields = `{
  title,
  "slug": slug.current,
  badge, intro,
  metaChips[]{ icon, text },
  tocTitle, dpaNoteTitle, dpaNoteText,
  sections[]{ anchor, number, title, body },
  lastUpdated,
  seo{ title, description, noIndex }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] ${siteSettingsFields}`;
export const homePageQuery = `*[_type == "homePage"][0] ${homePageFields}`;
export const notFoundPageQuery = `*[_type == "notFoundPage"][0] ${notFoundFields}`;
export const contentPageBySlugQuery = `*[_type == "contentPage" && slug.current == $slug][0] ${contentPageFields}`;
export const marketingBundleQuery = `{
  "siteSettings": *[_type == "siteSettings"][0] ${siteSettingsFields},
  "homePage": *[_type == "homePage"][0] ${homePageFields}
}`;

export function getSiteSettings() {
  return cachedSanityQuery('siteSettings', () =>
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  );
}

export function getHomePage() {
  return cachedSanityQuery('homePage', () => client.fetch<HomePage | null>(homePageQuery));
}

export function getNotFoundPage() {
  return cachedSanityQuery('notFoundPage', () =>
    client.fetch<NotFoundPage | null>(notFoundPageQuery),
  );
}

export function getContentPageBySlug(slug: string) {
  return cachedSanityQuery(`contentPage:${slug}`, () =>
    client.fetch<ContentPage | null>(contentPageBySlugQuery, { slug }),
  );
}

export function getMarketingBundle() {
  return cachedSanityQuery('marketingBundle', () =>
    client.fetch<{ siteSettings: SiteSettings | null; homePage: HomePage | null }>(
      marketingBundleQuery,
    ),
  );
}
