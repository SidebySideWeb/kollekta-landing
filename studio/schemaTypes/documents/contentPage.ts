import {defineType, defineField} from 'sanity'

export const contentPage = defineType({
  name: 'contentPage',
  title: 'Σελίδα Περιεχομένου',
  type: 'document',
  groups: [
    {name: 'content', title: 'Περιεχόμενο'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'π.χ. terms → /terms',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({name: 'badge', title: 'Badge', type: 'string', group: 'content'}),
    defineField({name: 'intro', title: 'Εισαγωγή', type: 'text', rows: 4, group: 'content'}),
    defineField({
      name: 'metaChips',
      title: 'Meta chips',
      type: 'array',
      of: [{type: 'metaChip'}],
      group: 'content',
    }),
    defineField({
      name: 'tocTitle',
      title: 'Τίτλος περιεχομένων',
      type: 'string',
      initialValue: 'Περιεχόμενα',
      group: 'content',
    }),
    defineField({
      name: 'dpaNoteTitle',
      title: 'DPA note τίτλος',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'dpaNoteText',
      title: 'DPA note κείμενο',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Ενότητες',
      type: 'array',
      of: [{type: 'contentSection'}],
      group: 'content',
    }),
    defineField({name: 'lastUpdated', title: 'Τελευταία ενημέρωση', type: 'date', group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
