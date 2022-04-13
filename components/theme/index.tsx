import { extendTheme } from '@chakra-ui/react'
import Button from './components/Button'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const components = {
  Button,
}

const theme = extendTheme({ colors, components })

export default theme
