import { ColorModeScript, theme } from '@chakra-ui/react'
import type { Viewport } from 'next'
import ReduxProvider from './store/provider'
import LocationBootstrap from './store/LocationBootstrap'
import { Provider } from './provider'
import { optimisticFont } from '@/app/fonts';
import TitleSync from '@/components/seo/TitleSync'
import "react-phone-input-2/lib/style.css";
import "@/public/styles/checkbox.scss"
import "@/public/styles/custom.css"
import "./globals.css"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = theme.config.initialColorMode

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <body className={`chakra-ui-${colorMode} ${optimisticFont.variable}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>
          <ReduxProvider>
            <LocationBootstrap />
            <TitleSync />
            {props.children}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  )
}
