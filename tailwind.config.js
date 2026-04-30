/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#004B8D',
          orange: '#F39200',
          'blue-dark': '#003366',
          'orange-light': '#FFAD33',
        },
        navy: {
          DEFAULT: '#001529',
          2: '#002140',
          3: '#003366',
        },
        slate: '#8A9BBB',
        border: '#1E2D48',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
    },
  },
  plugins: [],
}
