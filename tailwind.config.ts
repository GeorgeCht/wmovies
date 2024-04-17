import type { Config } from 'tailwindcss'

const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui(),
    // Add support for targeting children with child:
    // @see: https://stackoverflow.com/questions/77313213/react-radix-ui-scrollarea-full-height/78167722#78167722
    ({ addVariant }: { addVariant: any }) => {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    },
  ],
}
export default config
