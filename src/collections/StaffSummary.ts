import { CollectionConfig } from 'payload';

const StaffSummary: CollectionConfig = {
  slug: 'staff-summary',
  labels: {
    singular: 'Staff Summary',
    plural: 'Staff Summary',
  },
  admin: {
    useAsTitle: 'id',
    group: 'Mandatory Disclosures',
    description: 'Teaching staff breakdown shown in Section C: Result and Academics',
  },
  access: {
    read: () => true, // Public access for frontend
    create: ({ req: { user } }) => !!user, // Authenticated users
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'totalTeachers',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Total number of teachers (can be auto-calculated or manually entered)',
      },
    },
    {
      name: 'pgt',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Post Graduate Teachers',
      },
    },
    {
      name: 'tgt',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Trained Graduate Teachers',
      },
    },
    {
      name: 'prt',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Primary Teachers',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show/hide staff summary on the website',
      },
    },
    {
      name: 'academicYear',
      type: 'text',
      admin: {
        description: 'Optional: Academic year this data is for (e.g., "2024-2025")',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        description: 'When was this data last updated',
        position: 'sidebar',
      },
    },
  ],

  // HOOKS FOR AUTO-CALCULATIONS
 
};

export default StaffSummary;