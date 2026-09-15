export interface Seo {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface IconCard {
  icon?: string;
  title?: string;
  description?: string;
  footer?: string;
  footerTone?: 'rose' | 'amber' | 'emerald' | 'slate';
}

export interface StepItem {
  number?: string;
  title?: string;
  description?: string;
}

export interface FeatureItem {
  code?: string;
  category?: string;
  badge?: string;
  title?: string;
  description?: string;
  visual?: 'tags' | 'orders' | 'auth' | 'resize' | 'none';
}

export interface PricingFeature {
  text?: string;
  emphasize?: boolean;
  soonBadge?: boolean;
}

export interface PricingPlan {
  name?: string;
  price?: string;
  period?: string;
  billingNote?: string;
  tagline?: string;
  features?: PricingFeature[];
  ctaLabel?: string;
  highlighted?: boolean;
  highlightLabel?: string;
}

export interface HelpLink {
  icon?: string;
  title?: string;
  description?: string;
  href?: string;
}

export interface MetaChip {
  icon?: string;
  text?: string;
}

export interface ContentCallout {
  _type: 'contentCallout';
  text?: string;
}

export interface ContentInfoGrid {
  _type: 'contentInfoGrid';
  items?: { title?: string; text?: string }[];
}

export type PortableBlock =
  | {
      _type: 'block';
      style?: string;
      listItem?: string;
      children?: { text?: string; marks?: string[] }[];
      markDefs?: { _key: string; _type: string; href?: string }[];
    }
  | ContentCallout
  | ContentInfoGrid
  | Record<string, unknown>;

export interface ContentSection {
  anchor?: string;
  number?: string;
  title?: string;
  body?: PortableBlock[];
}

export interface SiteSettings {
  siteName?: string;
  tagline?: string;
  footerDescription?: string;
  navLinks?: NavLink[];
  headerCtaLabel?: string;
  headerCtaHref?: string;
  productLinks?: NavLink[];
  companyLinks?: NavLink[];
  legalLinks?: NavLink[];
  copyright?: string;
  studioCredit?: string;
  studioCreditHref?: string;
}

export interface HomePage {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  heroTrustLine?: string;
  heroMockupDomain?: string;
  heroMockupCollection?: string;
  problemEyebrow?: string;
  problemTitle?: string;
  problemCards?: IconCard[];
  solutionEyebrow?: string;
  solutionTitle?: string;
  solutionSteps?: StepItem[];
  featuresEyebrow?: string;
  featuresTitle?: string;
  features?: FeatureItem[];
  statEyebrow?: string;
  statValue?: string;
  statLabel?: string;
  statDescription?: string;
  statDisclaimer?: string;
  whiteLabelEyebrow?: string;
  whiteLabelTitle?: string;
  whiteLabelDescription?: string;
  securityEyebrow?: string;
  securityTitle?: string;
  securityItems?: IconCard[];
  pricingEyebrow?: string;
  pricingTitle?: string;
  pricingPlans?: PricingPlan[];
  foundingEyebrow?: string;
  foundingTitle?: string;
  foundingDescription?: string;
  contactTitle?: string;
  contactDescription?: string;
  contactSuccessTitle?: string;
  contactSuccessDescription?: string;
  seo?: Seo;
}

export interface NotFoundPage {
  badge?: string;
  title?: string;
  description?: string;
  statusTag?: string;
  errorCode?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  helpLinks?: HelpLink[];
  seo?: Seo;
}

export interface ContentPage {
  title?: string;
  slug?: string;
  badge?: string;
  intro?: string;
  metaChips?: MetaChip[];
  tocTitle?: string;
  dpaNoteTitle?: string;
  dpaNoteText?: string;
  sections?: ContentSection[];
  lastUpdated?: string;
  seo?: Seo;
}
