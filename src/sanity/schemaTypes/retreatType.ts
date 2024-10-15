import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export default defineType({
  name: 'retreat',
  title: 'Retreat',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      description: 'Name of the retreat',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      description: 'Start date of the retreat',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      description: 'End date of the retreat',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      description: 'Location of the retreat',
      type: 'string',
    }),
    defineField({
      name: 'price',
      description: 'Price in USD',
      type: 'number',
      initialValue: 1000,
    }),
    defineField({
      name: 'description',
      description: 'Description of the retreat',
      type: 'text',
    }),
  ],
})
