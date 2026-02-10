import { CollectionConfig } from 'payload';

const Appendix: CollectionConfig = {
  slug: 'appendix',
  labels: {
    singular: 'Appendix',
    plural: 'Appendices',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['section', 'serialNumber', 'title', 'updatedAt'],
    group: 'Mandatory Disclosures',
  },
  access: {
    read: () => true, // Public access for frontend
    create: ({ req: { user } }) => !!user, // Authenticated users
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // SECTION SELECTOR
    {
      name: 'section',
      type: 'select',
      required: true,
      admin: {
        description: 'Select the appendix section this entry belongs to',
        position: 'sidebar',
      },
      options: [
        { label: 'A: General Information', value: 'general' },
        { label: 'B: Documents and Information', value: 'documents' },
        { label: 'C: Result and Academics', value: 'academics' },
        { label: 'D: Staff (Teaching)', value: 'staff' },
        { label: 'E: School Infrastructure', value: 'infrastructure' },
        { label: 'Result Class X', value: 'result_x' },
        { label: 'Result Class XII', value: 'result_xii' },
      ],
    },

    // COMMON FIELDS
    {
      name: 'serialNumber',
      type: 'number',
      required: true,
      admin: {
        description: 'SL NO from the appendix table (for ordering)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Information/Document name (e.g., "NAME OF THE SCHOOL")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show/hide this entry on the website',
        position: 'sidebar',
      },
    },

    // CONDITIONAL: DETAILS FIELD (for General Info, Staff, Infrastructure)
    {
      name: 'details',
      type: 'textarea',
      admin: {
        condition: (data) => ['general', 'staff', 'infrastructure'].includes(data.section),
        description: 'The value/details for this information field',
      },
    },

    // CONDITIONAL: DOCUMENT UPLOAD (for Documents & Academics sections)
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => ['documents', 'academics'].includes(data.section),
        description: 'Upload the PDF document',
      },
    },
    {
      name: 'documentUrl',
      type: 'text',
      admin: {
        condition: (data) => ['documents', 'academics'].includes(data.section),
        description: 'External document URL (alternative to upload, e.g., Google Drive link)',
      },
    },

    // CONDITIONAL: STAFF DETAILS (for Staff section - Section D)

    // CONDITIONAL: RESULT DATA (for Class X & XII results)
    {
      name: 'resultData',
      type: 'group',
      admin: {
        condition: (data) => ['result_x', 'result_xii'].includes(data.section),
        description: 'Board examination results',
      },
      fields: [
        {
          name: 'year',
          type: 'number',
          required: true,
          min: 2000,
          max: 2100,
          admin: {
            description: 'Academic year (e.g., 2024)',
          },
        },
        {
          name: 'registered',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Number of registered students',
          },
        },
        {
          name: 'passed',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Number of students passed',
          },
        },
        {
          name: 'passPercentage',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Auto-calculated if left empty. Override if needed.',
            step: 0.01,
          },
        },
        {
          name: 'remarks',
          type: 'text',
          admin: {
            description: 'e.g., "All pass", "100% pass", "3 compartments"',
          },
        },
      ],
    },
  ],

  // HOOKS FOR AUTO-CALCULATIONS AND VALIDATIONS
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Auto-calculate pass percentage if not provided
        if (data?.resultData?.registered && data?.resultData?.passed) {
          if (!data.resultData.passPercentage || data.resultData.passPercentage === 0) {
            const percentage = (data.resultData.passed / data.resultData.registered) * 100;
            data.resultData.passPercentage = Math.round(percentage * 100) / 100; // Round to 2 decimals
          }
        }

        return data;
      },
    ],
    beforeChange: [
      ({ data }) => {
        // Validation: passed cannot exceed registered
        if (data?.resultData?.passed && data?.resultData?.registered) {
          if (data.resultData.passed > data.resultData.registered) {
            throw new Error('Number of passed students cannot exceed registered students');
          }
        }

        // Validation: ensure at least document or documentUrl is provided for document sections
        if (['documents', 'academics'].includes(data?.section)) {
          if (!data.document && !data.documentUrl) {
            throw new Error('Either upload a document or provide a document URL');
          }
        }

        return data;
      },
    ],
  },
};

export default Appendix;