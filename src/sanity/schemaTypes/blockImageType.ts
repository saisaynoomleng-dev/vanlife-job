import { defineField, defineType } from 'sanity';

export const blockImageType = defineType({
  name: 'blockImage',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) =>
        rule.required().info(`Alternative Text is Required for Accessibility`),
    }),
  ],
  options: {
    hotspot: true,
  },
});
