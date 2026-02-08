import { CollectionConfig } from 'payload';

const Textbook: CollectionConfig = {
  slug: 'textbooks',
  labels: {
    singular: 'Textbook',
    plural: 'Textbooks',
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
        description: 'Title of the textbook (e.g., "Mathematics – Class X")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Additional information about this textbook',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the textbook PDF file',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this textbook on the website',
      },
    },
  ],
  timestamps: true,
};

export default Textbook;
