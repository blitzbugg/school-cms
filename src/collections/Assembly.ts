import { CollectionConfig } from "payload";

export const Assembly: CollectionConfig = {
  slug: "assembly",
  labels: {
    singular: "Assembly",
    plural: "Assemblies",
  },
  admin: {
    useAsTitle: "photo",
    group: "The School",
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Show this image on the website",
      },
    },
    
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
        admin: {
            description: "Description of the assembly",
        },
    },
  ],
};
