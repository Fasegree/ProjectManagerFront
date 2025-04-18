module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
     fontFamily: {
        'aeroport-black': ['Aeroport-black', 'sans-serif'],
        'aeroport-black-italic': ['Aeroport-black-italic', 'sans-serif'],
        'aeroport-bold-italic': ['Aeroport-bold-italic-trial', 'sans-serif'],
        'aeroport-bold': ['Aeroport-bold-trial', 'sans-serif'],
        'aeroport-light-italic': ['Aeroport-light-italic-trial', 'sans-serif'],
        'aeroport-light': ['Aeroport-light-trial', 'sans-serif'],
        'aeroport-medium-italic': ['Aeroport-medium-italic-trial', 'sans-serif'],
        'aeroport-medium': ['Aeroport-medium-trial', 'sans-serif'],
        'aeroport-monospaced': ['Aeroport-monospaced-trial', 'monospace'],
        'aeroport-regular-italic': ['Aeroport-regular-italic-trial', 'sans-serif'],
        'aeroport-regular': ['Aeroport-regular-trial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}