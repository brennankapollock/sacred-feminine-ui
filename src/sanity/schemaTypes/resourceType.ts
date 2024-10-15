import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'resourceType',
      type: 'string',
      options: {
        list: ['music', 'book', 'writing', 'meditation', 'video'],
        layout: 'radio',
      },
    }),
  ],
})
