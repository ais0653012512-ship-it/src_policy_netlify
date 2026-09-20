import { HStack } from '@chakra-ui/react'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { useScrollSpy } from 'hooks/use-scrollspy'
import { usePathname } from 'next/navigation'

import * as React from 'react'

import { MobileNavButton } from '#components/mobile-nav'
import { MobileNavContent } from '#components/mobile-nav'
import { NavLink } from '#components/nav-link'
import siteConfig from '#data/config'

type HeaderLink = {
  label: string
  href?: string
  id?: string
  variant?: string
}

const Navigation: React.FC = () => {
  const mobileNav = useDisclosure()
  const path = usePathname()
  const links = siteConfig.header.links as HeaderLink[]

  const activeId = useScrollSpy(
    links.filter((link) => link.id).map((link) => `[id="${link.id}"]`),
    {
      threshold: 0.75,
    },
  )

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()
  const showMobileNav = links.length > 1

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <HStack spacing="2" flexShrink={0}>
      {links.map(({ href, id, label, ...props }, i) => {
        return (
          <NavLink
            display={showMobileNav ? ['none', null, 'block'] : 'block'}
            href={href || (id ? `/#${id}` : '#')}
            key={i}
            isActive={
              !!(
                (id && activeId === id) ||
                (href && !!path?.match(new RegExp(href)))
              )
            }
            {...props}
          >
            {label}
          </NavLink>
        )
      })}

      {showMobileNav ? (
        <>
          <MobileNavButton
            ref={mobileNavBtnRef}
            aria-label="Open Menu"
            onClick={mobileNav.onOpen}
          />
          <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
        </>
      ) : null}
    </HStack>
  )
}

export default Navigation
