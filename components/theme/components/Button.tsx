import { Button as ButtonBase, ButtonProps, CSSObject } from '@chakra-ui/react'

function Button(props: ButtonProps) {
  const _hover: CSSObject = {
    bgColor: '#F0E0D0',
    color: '#472805',
    borderColor: '#472805',
    borderWidth: 1,
  }
  const _disabled: CSSObject = {
    bgColor: '#A8A8A8',
    color: '#777777',
  }
  return (
    <ButtonBase
      {...props}
      bgColor="#472805"
      borderWidth={1}
      color="white"
      borderRadius={10}
      p="10px 16px"
      borderColor="#472805"
      _hover={_hover}
      _disabled={_disabled}
      fontWeight="bold"
    >
      {props.children}
    </ButtonBase>
  )
}

export default Button
