import { Message } from '../../../../../types/message';
import { User } from '../../../../../types/user';

interface IChatFormProps {
  messages: Message[],
  user: User | null,
  onClick?: () => void;
}

export default IChatFormProps;
