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
    "./node_modules/rc-modal-sheet/**/*.js", // Add this line
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
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))'
      },
      ringColor: {
        DEFAULT: 'hsl(var(--ring))'
      },
      aspectRatio: {
        'a4': '210 / 297',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'var(--rubik)']
      },
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('tailwindcss-animate'),
    require("tailwindcss-radix")()
  ]
} satisfies Config

export default config
