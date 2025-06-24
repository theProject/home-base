// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, 
    // just in cae TailwindCSS v.4 still needs it  'autoprefixer': {},
  },
};

export default config;
