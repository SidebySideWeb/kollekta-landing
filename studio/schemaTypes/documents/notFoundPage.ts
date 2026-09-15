import {defineType, defineField} from 'sanity'

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: 'Σελίδα 404',
  type: 'document',
  groups: [
    {name: 'content', title: 'Περιεχόμενο'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'badge', title: 'Badge', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string', group: 'content'}),
    defineField({name: 'description', title: 'Περιγραφή', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'statusTag', title: 'Status tag', type: 'string', group: 'content'}),
    defineField({name: 'errorCode', title: 'Error code', type: 'string', group: 'content'}),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA', type: 'string', group: 'content'}),
    defineField({name: 'primaryCtaHref', title: 'Primary CTA URL', type: 'string', group: 'content'}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA', type: 'string', group: 'content'}),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA URL',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'helpLinks',
      title: 'Σύνδεσμοι βοήθειας',
      type: 'array',
      of: [{type: 'helpLink'}],
      group: 'content',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
})
