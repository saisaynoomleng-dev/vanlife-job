import { defineField, defineType } from 'sanity';
import { FaShuttleVan } from 'react-icons/fa';
import { formatCurrency, formatTitle, formatUppercase } from '@/lib/formatter';

export const vanType = defineType({
  name: 'van',
  title: 'Vans',
  icon: FaShuttleVan,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Van Name',
      type: 'string',
      validation: (rule) => rule.required().info(`Van Name is require`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) =>
        rule.required().info(`Required to generate a page on the website`),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Simple',
            value: 'simple',
          },
          {
            title: 'Rugged',
            value: 'rugged',
          },
          {
            title: 'Luxury',
            value: 'luxury',
          },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricePerDay',
      title: 'Rental Price Per Day',
      type: 'number',
      validation: (rule) =>
        rule.required().info(`Required to display price on the website`),
    }),
    defineField({
      name: 'body',
      title: 'Van Description',
      type: 'blockContent',
      validation: (rule) =>
        rule.required().info(`Required for van description`),
    }),
    defineField({
      name: 'mainImage',
      title: 'Van Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      pricePerDay: 'pricePerDay',
      image: 'mainImage',
      type: 'type',
    },
    prepare({ name, pricePerDay, image, type }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const priceFormatted = pricePerDay
        ? formatCurrency(pricePerDay)
        : 'Price not privided';
      const typeFormatted = type ? formatUppercase(type) : 'Type not Provided';

      return {
        title: nameFormatted,
        subtitle: `Price: ${priceFormatted} | Type: ${typeFormatted}`,
        media: image || FaShuttleVan,
      };
    },
  },
});
