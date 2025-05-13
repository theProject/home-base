// File: payload/collections/Media.ts
    import { CollectionConfig } from 'payload';
    import path from 'path'; // Needed for path.resolve

    const Media: CollectionConfig = {
      slug: 'media',
      upload: {
        staticDir: path.resolve(process.cwd(), 'public/media'), // Store uploaded files in `public/media`
                                                                // This makes them publicly accessible via `/media/...`
        // Removed 'staticURL' as it is not a valid property of 'UploadConfig'
        adminThumbnail: 'thumbnail', // Use the 'thumbnail' imageSize for admin UI previews
        imageSizes: [ // Define different image sizes to be auto-generated
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card', // Example: a size for blog post cards
            width: 768,
            height: 1024, // Or null to auto-scale height
            position: 'centre',
          },
          {
            name: 'tablet', // Example: a size for tablet displays
            width: 1024,
            height: undefined,
            position: 'centre',
          },
        ],
      },
      access: { // Control who can read media files
        read: () => true, // Makes all media files publicly readable
      },
      fields: [
        {
          name: 'alt', // Alt text for images (good for accessibility)
          type: 'text',
          required: true,
        },
        // You can add other fields like 'caption', etc.
      ],
    };

    export default Media;