'use client'

import { Box, ButtonGroup, Container, Icon, Stack, Text } from '@chakra-ui/react'
import { Br } from '@saas-ui/react'
import type { NextPage } from 'next'
import { FiArrowRight } from 'react-icons/fi'

import { ButtonLink } from '#components/button-link/button-link'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { FallInPlace } from '#components/motion/fall-in-place'

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden" minH="100vh">
      <BackgroundGradient height="100%" zIndex="0" />

      <Container
        maxW="container.md"
        position="relative"
        zIndex="1"
        minH="100vh"
        display="flex"
        alignItems="center"
        py={{ base: 28, md: 32 }}
      >
        <Stack spacing={{ base: 6, md: 8 }} align="flex-start" maxW="36rem">
          <FallInPlace>
            <Text
              as="p"
              fontSize={{ base: '3.5rem', md: '5rem' }}
              fontWeight="700"
              letterSpacing="-0.045em"
              lineHeight="0.95"
              color="secondary.900"
            >
              NovaStack
            </Text>
          </FallInPlace>

          <FallInPlace delay={0.12}>
            <Text
              as="h1"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="600"
              letterSpacing="-0.03em"
              lineHeight="1.25"
              color="secondary.900"
            >
              Nền tảng công nghệ
              <Br /> cho sản phẩm số hiện đại
            </Text>
          </FallInPlace>

          <FallInPlace delay={0.24}>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="secondary.600"
              lineHeight="1.7"
              maxW="34ch"
            >
              API, xác thực, cloud và giám sát — gói gọn trong một stack để đội
              kỹ sư tập trung xây sản phẩm.
            </Text>
          </FallInPlace>

          <FallInPlace delay={0.36}>
            <ButtonGroup spacing={3} pt="1">
              <ButtonLink colorScheme="primary" size="lg" href="#" borderRadius="md">
                Bắt đầu
              </ButtonLink>
              <ButtonLink
                size="lg"
                href="mailto:hello@novastack.dev"
                variant="ghost"
                borderRadius="md"
                color="secondary.600"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                Liên hệ
              </ButtonLink>
            </ButtonGroup>
          </FallInPlace>
        </Stack>
      </Container>
    </Box>
  )
}

export default Home
