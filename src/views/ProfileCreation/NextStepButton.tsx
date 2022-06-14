import { ArrowForwardIcon, Button, ButtonProps } from 'hydroswap-uikitv2'

const NextStepButton: React.FC<ButtonProps> = (props) => {
  return <Button endIcon={<ArrowForwardIcon color="currentColor" />} {...props} />
}

export default NextStepButton
