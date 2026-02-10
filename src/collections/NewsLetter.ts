import { CollectionConfig } from 'payload';

const NewsLetter: CollectionConfig = {
  slug: 'newsletter',
  labels: {
    singular: 'Newsletter',
    plural: 'Newsletters',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'file', 'updatedAt'],
    group: 'Mandatory Disclosures',
  },
  access: {
    read: () => true, // everyone can see
    create: ({ req }) => !!req.user, // only admins can add
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title for this newsletter (e.g., "Newsletter - July 2024")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this newsletter is for',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the newsletter PDF file',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this newsletter on the website',
      },
    },
  ],
  timestamps: true,
};

export default NewsLetter;