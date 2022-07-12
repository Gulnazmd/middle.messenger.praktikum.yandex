interface IButtonProps {
  text: string,
  onClick: () => void,
  type?: 'submit',
  className?: string,
  label: string,
  id?: string,
  dataId: string
}
export default IButtonProps;
