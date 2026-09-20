import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

/** Palette teal/ink — thay purple mặc định của Saas UI template */
const primary = {
  50: '#eef8f6',
  100: '#d4efea',
  200: '#a9dfd4',
  300: '#74c7b8',
  400: '#3fa897',
  500: '#0f766e',
  600: '#0c5f59',
  700: '#0a4a46',
  800: '#083a37',
  900: '#062e2c',
}

const secondary = {
  50: '#f2f5f7',
  100: '#e0e7ec',
  200: '#c2cfd9',
  300: '#9bb0bf',
  400: '#6f8a9d',
  500: '#516f84',
  600: '#405868',
  700: '#344754',
  800: '#2c3b46',
  900: '#1c2b33',
}

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
    colors: {
      primary,
      secondary,
    },
    styles: {
      global: {
        body: {
          color: 'secondary.900',
          bg: '#f3f6f5',
          fontSize: 'lg',
        },
      },
    },
    fonts: {
      heading: 'var(--font-landing), Outfit, system-ui, sans-serif',
      body: 'var(--font-landing), Outfit, system-ui, sans-serif',
    },
    radii: {
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    shadows: {
      outline: '0 0 0 3px rgba(15, 118, 110, 0.28)',
    },
    fontSizes,
    components,
  },
  baseTheme,
)
