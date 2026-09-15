import {defineType, defineField} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Marketing Landing',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'problem', title: 'Πρόβλημα'},
    {name: 'solution', title: 'Λύση'},
    {name: 'features', title: 'Λειτουργίες'},
    {name: 'stats', title: 'Στατιστικό'},
    {name: 'brand', title: 'White-label'},
    {name: 'security', title: 'Ασφάλεια'},
    {name: 'pricing', title: 'Τιμές'},
    {name: 'founding', title: 'Ιδρυτικοί'},
    {name: 'contact', title: 'Φόρμα'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroBadge', title: 'Hero badge', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitle', title: 'Hero τίτλος', type: 'text', rows: 3, group: 'hero'}),
    defineField({name: 'heroDescription', title: 'Hero περιγραφή', type: 'text', rows: 4, group: 'hero'}),
    defineField({name: 'heroPrimaryCta', title: 'Primary CTA', type: 'string', group: 'hero'}),
    defineField({name: 'heroSecondaryCta', title: 'Secondary CTA', type: 'string', group: 'hero'}),
    defineField({name: 'heroTrustLine', title: 'Trust line', type: 'string', group: 'hero'}),
    defineField({name: 'heroMockupDomain', title: 'Mockup domain', type: 'string', group: 'hero'}),
    defineField({name: 'heroMockupCollection', title: 'Mockup συλλογή', type: 'string', group: 'hero'}),

    defineField({name: 'problemEyebrow', title: 'Eyebrow', type: 'string', group: 'problem'}),
    defineField({name: 'problemTitle', title: 'Τίτλος', type: 'string', group: 'problem'}),
    defineField({
      name: 'problemCards',
      title: 'Κάρτες προβλήματος',
      type: 'array',
      of: [{type: 'iconCard'}],
      group: 'problem',
    }),

    defineField({name: 'solutionEyebrow', title: 'Eyebrow', type: 'string', group: 'solution'}),
    defineField({name: 'solutionTitle', title: 'Τίτλος', type: 'string', group: 'solution'}),
    defineField({
      name: 'solutionSteps',
      title: 'Βήματα',
      type: 'array',
      of: [{type: 'stepItem'}],
      group: 'solution',
    }),

    defineField({name: 'featuresEyebrow', title: 'Eyebrow', type: 'string', group: 'features'}),
    defineField({name: 'featuresTitle', title: 'Τίτλος', type: 'string', group: 'features'}),
    defineField({
      name: 'features',
      title: 'Λειτουργίες',
      type: 'array',
      of: [{type: 'featureItem'}],
      group: 'features',
    }),

    defineField({name: 'statEyebrow', title: 'Eyebrow', type: 'string', group: 'stats'}),
    defineField({name: 'statValue', title: 'Αριθμός', type: 'string', group: 'stats'}),
    defineField({name: 'statLabel', title: 'Ετικέτα', type: 'string', group: 'stats'}),
    defineField({name: 'statDescription', title: 'Περιγραφή', type: 'text', rows: 4, group: 'stats'}),
    defineField({name: 'statDisclaimer', title: 'Disclaimer', type: 'text', rows: 2, group: 'stats'}),

    defineField({name: 'whiteLabelEyebrow', title: 'Eyebrow', type: 'string', group: 'brand'}),
    defineField({name: 'whiteLabelTitle', title: 'Τίτλος', type: 'string', group: 'brand'}),
    defineField({
      name: 'whiteLabelDescription',
      title: 'Περιγραφή',
      type: 'text',
      rows: 4,
      group: 'brand',
    }),

    defineField({name: 'securityEyebrow', title: 'Eyebrow', type: 'string', group: 'security'}),
    defineField({name: 'securityTitle', title: 'Τίτλος', type: 'string', group: 'security'}),
    defineField({
      name: 'securityItems',
      title: 'Σημεία ασφαλείας',
      type: 'array',
      of: [{type: 'iconCard'}],
      group: 'security',
    }),

    defineField({name: 'pricingEyebrow', title: 'Eyebrow', type: 'string', group: 'pricing'}),
    defineField({name: 'pricingTitle', title: 'Τίτλος', type: 'string', group: 'pricing'}),
    defineField({
      name: 'pricingPlans',
      title: 'Πακέτα',
      type: 'array',
      of: [{type: 'pricingPlan'}],
      group: 'pricing',
    }),

    defineField({name: 'foundingEyebrow', title: 'Eyebrow', type: 'string', group: 'founding'}),
    defineField({name: 'foundingTitle', title: 'Τίτλος', type: 'string', group: 'founding'}),
    defineField({
      name: 'foundingDescription',
      title: 'Περιγραφή',
      type: 'text',
      rows: 4,
      group: 'founding',
    }),

    defineField({name: 'contactTitle', title: 'Τίτλος φόρμας', type: 'string', group: 'contact'}),
    defineField({
      name: 'contactDescription',
      title: 'Περιγραφή φόρμας',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'contactSuccessTitle',
      title: 'Τίτλος επιτυχίας',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactSuccessDescription',
      title: 'Περιγραφή επιτυχίας',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
})
