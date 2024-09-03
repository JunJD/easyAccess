import type { Config } from 'tailwindcss'
import { join } from 'path';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';

const config = {
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{libs,src,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      backgroundImage: {
        'span-bg': 'var(--span-bg)'
      },
      colors: {
        white2: 'var(--white)',
        primary: {
          DEFAULT: 'var(--primary)'
        },
        'button-secondary': 'var(--button-secondary)',
        'button-text': 'var(--button-text)',
        'text-secondary': 'var(--text-secondary)',
        secondary: 'var(--secondary)',
        button: 'var(--button)',
        selected: 'var(--selected)',
        dropdown: 'var(--dropdown)',
        dropdownHover: 'var(--dropdown-hover)',
        buttonSecondary: 'var(--button-secondary)'
      },

      borderColor: ({theme}) => ({
        ...theme('colors'),
        secondary: 'var(--bg-secondary)',
        primary: 'var(--primary)',
      }),

      backgroundColor: ({theme}) => ({
        ...theme('colors'),
        secondary: 'var(--bg-secondary)',
        background: 'var(--background)',
      }),

      aspectRatio: {
        'a4': '210 / 297',
      },

      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'var(--rubik)']
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    require("tailwindcss-radix")()
  ]
} satisfies Config

export default config
