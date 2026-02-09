import { is } from "@payloadcms/db-postgres/drizzle";
import { CollectionConfig } from "payload";

export const Images: CollectionConfig = {
  slug: "excellence-image",
  labels: {
    singular: "Excellence",
    plural: "Excellence Images",
  },
  admin: {
    useAsTitle: "photo",
    group: "Media and Gallery",
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
  ],
};
