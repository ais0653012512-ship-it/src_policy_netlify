import { Box } from '@chakra-ui/react'

/** Atmosphere cho landing marketing — teal mist, không purple */
export const BackgroundGradient = ({ hideOverlay, ...props }: any) => {
  const background = `
    radial-gradient(900px 520px at 8% -8%, rgba(15, 118, 110, 0.22), transparent 58%),
    radial-gradient(720px 420px at 92% 8%, rgba(28, 43, 51, 0.10), transparent 55%),
    radial-gradient(640px 360px at 50% 100%, rgba(63, 168, 151, 0.14), transparent 60%),
    linear-gradient(180deg, #e8f0ee 0%, #f3f6f5 45%, #ffffff 100%)
  `

  const overlay = hideOverlay
    ? undefined
    : 'linear-gradient(180deg, rgba(243, 246, 245, 0) 0%, rgba(243, 246, 245, 0.72) 72%, #f3f6f5 100%)'

  return (
    <Box
      backgroundImage={background}
      position="absolute"
      top="0"
      left="0"
      zIndex="0"
      height="100%"
      width="100%"
      overflow="hidden"
      pointerEvents="none"
      {...props}
    >
      {overlay ? (
        <Box
          backgroundImage={overlay}
          position="absolute"
          inset="0"
          zIndex="1"
        />
      ) : null}
    </Box>
  )
}
