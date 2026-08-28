/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#28B2A8',
          blue: '#0D3666',
          cyan: '#1FA6C9',
          light: '#EBF1F5',
          soft: '#E2F5F7',
          navy: '#1A2638',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #E2F5F7 0%, #D4F4F3 100%)',
        'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #E2F5F7 100%)',
        'gradient-soft': 'linear-gradient(135deg, #E2F5F7 0%, #EBF1F5 100%)',
        'gradient-teal': 'linear-gradient(135deg, #28B2A8 0%, #38D3C8 100%)',
      },
      boxShadow: {
        'brand-glow': '0 0 25px rgba(40, 178, 168, 0.2)',
        'medical-card': '0 4px 20px -2px rgba(40, 178, 168, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
