import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ρυθμίσεις Site',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Brand'},
    {name: 'nav', title: 'Πλοήγηση'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Όνομα site',
      type: 'string',
      initialValue: 'Kollekta',
      group: 'brand',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'B2B MEDIA SUITE',
      group: 'brand',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Περιγραφή footer',
      type: 'text',
      rows: 3,
      group: 'brand',
    }),
    defineField({
      name: 'navLinks',
      title: 'Σύνδεσμοι header',
      type: 'array',
      of: [{type: 'navLink'}],
      group: 'nav',
    }),
    defineField({
      name: 'headerCtaLabel',
      title: 'CTA header',
      type: 'string',
      group: 'nav',
    }),
    defineField({
      name: 'headerCtaHref',
      title: 'CTA header URL',
      type: 'string',
      group: 'nav',
    }),
    defineField({
      name: 'productLinks',
      title: 'Footer — Προϊόν',
      type: 'array',
      of: [{type: 'navLink'}],
      group: 'footer',
    }),
    defineField({
      name: 'companyLinks',
      title: 'Footer — Εταιρεία',
      type: 'array',
      of: [{type: 'navLink'}],
      group: 'footer',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Footer — Νομικά',
      type: 'array',
      of: [{type: 'navLink'}],
      group: 'footer',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'studioCredit',
      title: 'Studio credit',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'studioCreditHref',
      title: 'Studio credit URL',
      type: 'string',
      group: 'footer',
    }),
  ],
})
