import { Heading, HTMLChakraProps, chakra } from '@chakra-ui/react'

/** Wordmark text — thay SVG Saas UI cũ cho landing công nghệ */
export const Logo: React.FC<HTMLChakraProps<'div'>> = (props) => {
  return (
    <chakra.div display="inline-flex" alignItems="center" {...props}>
      <Heading
        as="span"
        fontSize="xl"
        fontWeight="700"
        letterSpacing="-0.04em"
        color="primary.600"
        lineHeight="1"
      >
        Nova
        <chakra.span color="secondary.900">Stack</chakra.span>
      </Heading>
    </chakra.div>
  )
}
