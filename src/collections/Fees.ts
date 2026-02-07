import { CollectionConfig } from 'payload';

const Fees: CollectionConfig = {
  slug: 'fees',
  labels: {
    singular: 'Fees Document',
    plural: 'Fees Documents',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'file', 'updatedAt'],
    group: 'Documents',
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
        description: 'Title for this Fees document (e.g., "Fees Structure 2024")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this fees document is for',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the Fees document PDF file',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this Fees document on the website',
      },
    },
  ],
  timestamps: true,
};

export default Fees;
