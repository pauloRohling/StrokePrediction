module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    colors: {
      transparent: "#FFFFFF00",
      current: "currentColor",
      white: "#FFFFFF",
      "imperial-red": "#E63946",
      "honeydew": "#F1FAEE",
      "powder-blue": "#A8DADC",
      "celadon-blue": "#457B9D",
      "prussian-blue": "#1D3557",
    },

    fontSize: {
      12: ['0.75rem', { lineHeight: '1.125', letterSpacing: '-0.04em' }],
      14: ['0.875rem', { lineHeight: '1.125', letterSpacing: '-0.04em' }],
      16: ['1rem', { lineHeight: '1.125', letterSpacing: '-0.04em' }],
      20: ['1.25rem', { lineHeight: '1.125', letterSpacing: '-0.04em' }],
      24: ['1.5rem', { lineHeight: '1.5rem', letterSpacing: '-0.04em' }],
      36: ['2.25rem', { lineHeight: '2.25rem', letterSpacing: '-0.04em' }],
    },

    fontFamily: {
      'inter': ['Inter', 'Helvetica', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif']
    },

    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
