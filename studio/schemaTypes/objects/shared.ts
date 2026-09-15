import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Meta τίτλος',
      type: 'string',
      description: '50-60 χαρακτήρες',
    }),
    defineField({
      name: 'description',
      title: 'Meta περιγραφή',
      type: 'text',
      rows: 3,
      description: '120-160 χαρακτήρες',
    }),
    defineField({name: 'ogImage', title: 'Social share εικόνα', type: 'image'}),
    defineField({
      name: 'noIndex',
      title: 'Απόκρυψη από μηχανές αναζήτησης',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

export const navLink = defineType({
  name: 'navLink',
  title: 'Σύνδεσμος',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Κείμενο', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

export const iconCard = defineType({
  name: 'iconCard',
  title: 'Κάρτα με εικονίδιο',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Εικονίδιο (Material Symbols)',
      type: 'string',
      description: 'π.χ. link_off, shield, check_circle',
    }),
    defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
    defineField({name: 'description', title: 'Περιγραφή', type: 'text', rows: 3}),
    defineField({name: 'footer', title: 'Υποσημείωση', type: 'string'}),
    defineField({
      name: 'footerTone',
      title: 'Χρώμα υποσημείωσης',
      type: 'string',
      options: {list: ['rose', 'amber', 'emerald', 'slate']},
      initialValue: 'slate',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'icon'}},
})

export const stepItem = defineType({
  name: 'stepItem',
  title: 'Βήμα',
  type: 'object',
  fields: [
    defineField({name: 'number', title: 'Αριθμός', type: 'string'}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
    defineField({name: 'description', title: 'Περιγραφή', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'number'}},
})

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Λειτουργία',
  type: 'object',
  fields: [
    defineField({name: 'code', title: 'Κωδικός (01)', type: 'string'}),
    defineField({name: 'category', title: 'Κατηγορία', type: 'string'}),
    defineField({name: 'badge', title: 'Badge (π.χ. Pro / Business)', type: 'string'}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
    defineField({name: 'description', title: 'Περιγραφή', type: 'text', rows: 5}),
    defineField({
      name: 'visual',
      title: 'Οπτικό panel',
      type: 'string',
      options: {
        list: [
          {title: 'Tags / Reach', value: 'tags'},
          {title: 'Order permission', value: 'orders'},
          {title: 'Quick auth', value: 'auth'},
          {title: 'Resizing', value: 'resize'},
          {title: 'Κανένα', value: 'none'},
        ],
      },
      initialValue: 'none',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'category'}},
})

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Πακέτο',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Όνομα', type: 'string'}),
    defineField({name: 'price', title: 'Τιμή', type: 'string', description: 'π.χ. 600 €'}),
    defineField({name: 'period', title: 'Περίοδος', type: 'string', description: 'π.χ. /έτος'}),
    defineField({name: 'billingNote', title: 'Σημείωση χρέωσης', type: 'string'}),
    defineField({name: 'tagline', title: 'Σύντομη περιγραφή', type: 'text', rows: 2}),
    defineField({
      name: 'features',
      title: 'Χαρακτηριστικά',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Κείμενο', type: 'string'}),
            defineField({name: 'emphasize', title: 'Έμφαση', type: 'boolean', initialValue: false}),
            defineField({name: 'soonBadge', title: 'Badge «Σύντομα»', type: 'boolean', initialValue: false}),
          ],
          preview: {select: {title: 'text'}},
        },
      ],
    }),
    defineField({name: 'ctaLabel', title: 'Κείμενο CTA', type: 'string'}),
    defineField({name: 'highlighted', title: 'Προτεινόμενο', type: 'boolean', initialValue: false}),
    defineField({name: 'highlightLabel', title: 'Ετικέτα προτεινόμενου', type: 'string'}),
  ],
  preview: {select: {title: 'name', subtitle: 'price'}},
})

export const helpLink = defineType({
  name: 'helpLink',
  title: 'Σύνδεσμος βοήθειας',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Εικονίδιο', type: 'string'}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
    defineField({name: 'description', title: 'Περιγραφή', type: 'text', rows: 2}),
    defineField({name: 'href', title: 'URL', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'href'}},
})

export const contentSection = defineType({
  name: 'contentSection',
  title: 'Ενότητα περιεχομένου',
  type: 'object',
  fields: [
    defineField({name: 'anchor', title: 'Anchor ID', type: 'string', description: 'π.χ. section-1'}),
    defineField({name: 'number', title: 'Αριθμός', type: 'string'}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
    defineField({
      name: 'body',
      title: 'Κείμενο',
      type: 'array',
      of: [{type: 'block'}, {type: 'contentCallout'}, {type: 'contentInfoGrid'}],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'number'}},
})

export const contentCallout = defineType({
  name: 'contentCallout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'text'}},
})

export const contentInfoGrid = defineType({
  name: 'contentInfoGrid',
  title: 'Info grid (2 στήλες)',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Κελιά',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
            defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title'}},
        },
      ],
    }),
  ],
  preview: {
    select: {items: 'items'},
    prepare({items}) {
      return {title: `Info grid (${items?.length ?? 0})`}
    },
  },
})

export const metaChip = defineType({
  name: 'metaChip',
  title: 'Meta chip',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Εικονίδιο', type: 'string'}),
    defineField({name: 'text', title: 'Κείμενο', type: 'string'}),
  ],
  preview: {select: {title: 'text', subtitle: 'icon'}},
})
