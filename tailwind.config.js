// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  "compilerOptions": {
    // other options...
    "typeRoots": ["./node_modules/@types", "./src/types"]
  }
}
