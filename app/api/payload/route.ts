// File: app/api/payload/route.ts

// 1) Pull in your payload.config
//    (use your tsconfig alias or a relative import)
import config from '@payload-config';  

// 2) Include the Admin UI CSS
import '@payloadcms/next/css';

// 3) Import the REST handlers
import {
  REST_GET,
  REST_POST,
  REST_PUT,
  REST_PATCH,
  REST_DELETE,
  REST_OPTIONS,
} from '@payloadcms/next/routes';

// 4) Export every HTTP method
export const GET     = REST_GET(config);
export const POST    = REST_POST(config);
export const PUT     = REST_PUT(config);
export const PATCH   = REST_PATCH(config);
export const DELETE  = REST_DELETE(config);
export const OPTIONS = REST_OPTIONS(config);
