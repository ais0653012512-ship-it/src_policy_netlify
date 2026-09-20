'use client'

import { Box, SkipNavContent, SkipNavLink } from '@chakra-ui/react'

import { ReactNode } from 'react'

import { landingFont } from '@/app/fonts'
import { Header, HeaderProps } from './header'

interface LayoutProps {
  children: ReactNode
  headerProps?: HeaderProps
}

/** Landing tối giản — chỉ header + nội dung, không footer nặng */
export const MarketingLayout: React.FC<LayoutProps> = (props) => {
  const { children, headerProps } = props
  return (
    <Box className={landingFont.variable} minH="100vh" bg="#f3f6f5" color="secondary.900">
      <SkipNavLink>Skip to content</SkipNavLink>
      <Header {...headerProps} />
      <Box as="main">
        <SkipNavContent />
        {children}
      </Box>
    </Box>
  )
}
