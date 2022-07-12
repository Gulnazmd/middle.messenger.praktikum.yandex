interface IChatFormProps {
  messages: Message[],
  user: Nullable<User>,
  onClick?: () => void;
}

export default IChatFormProps;
