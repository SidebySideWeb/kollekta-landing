import {defineType, defineField} from 'sanity'

export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Υποβολή φόρμας',
  type: 'document',
  fields: [
    defineField({
      name: 'formType',
      title: 'Τύπος',
      type: 'string',
      options: {list: [{title: 'Ενδιαφέρον', value: 'interest'}]},
      readOnly: true,
      initialValue: 'interest',
    }),
    defineField({name: 'companyName', title: 'Επωνυμία εταιρείας', type: 'string', readOnly: true}),
    defineField({name: 'plan', title: 'Πακέτο', type: 'string', readOnly: true}),
    defineField({name: 'planUnsure', title: 'Δεν είναι σίγουρος/η', type: 'boolean', readOnly: true}),
    defineField({name: 'fullName', title: 'Ονοματεπώνυμο', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Τηλέφωνο', type: 'string', readOnly: true}),
    defineField({name: 'consent', title: 'Συναίνεση', type: 'boolean', readOnly: true}),
    defineField({name: 'read', title: 'Διαβάστηκε', type: 'boolean', initialValue: false}),
    defineField({name: 'starred', title: 'Επισημασμένο', type: 'boolean', initialValue: false}),
    defineField({name: 'submittedAt', title: 'Ημερομηνία', type: 'datetime', readOnly: true}),
  ],
  orderings: [
    {
      title: 'Πιο πρόσφατα',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'companyName', subtitle: 'fullName', read: 'read'},
    prepare({title, subtitle, read}) {
      return {
        title: read ? title : `● ${title || 'Χωρίς επωνυμία'}`,
        subtitle,
      }
    },
  },
})
