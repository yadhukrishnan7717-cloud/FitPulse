let plugins = {};
try {
  require.resolve('tailwindcss');
  plugins = {
    tailwindcss: {},
    autoprefixer: {},
  };
} catch (e) {
  // PostCSS plugins will run after npm install on Vercel deployment
}

export default { plugins };
