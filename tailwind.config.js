/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}', 
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'aeroport-black': [
  				'Aeroport-black',
  				'sans-serif'
  			],
  			'aeroport-black-italic': [
  				'Aeroport-black-italic',
  				'sans-serif'
  			],
  			'aeroport-bold-italic': [
  				'Aeroport-bold-italic-trial',
  				'sans-serif'
  			],
  			'aeroport-bold': [
  				'Aeroport-bold-trial',
  				'sans-serif'
  			],
  			'aeroport-light-italic': [
  				'Aeroport-light-italic-trial',
  				'sans-serif'
  			],
  			'aeroport-light': [
  				'Aeroport-light-trial',
  				'sans-serif'
  			],
  			'aeroport-medium-italic': [
  				'Aeroport-medium-italic-trial',
  				'sans-serif'
  			],
  			'aeroport-medium': [
  				'Aeroport-medium-trial',
  				'sans-serif'
  			],
  			'aeroport-monospaced': [
  				'Aeroport-monospaced-trial',
  				'monospace'
  			],
  			'aeroport-regular-italic': [
  				'Aeroport-regular-italic-trial',
  				'sans-serif'
  			],
  			'aeroport-regular': [
  				'Aeroport-regular-trial',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}