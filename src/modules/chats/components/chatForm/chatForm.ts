import Block from 'core/block';
import '../../chats.css';
import { IChatFormProps } from './types';

class ChatForm extends Block<IChatFormProps> {
  getChat() {
    let messagesString = '';
    this.props.messages.forEach((message: Message) => {
      const isCurrentUserSender = message.userId !== this.props.user?.id;
      const containerClassName = `message ${isCurrentUserSender}` ? 'right' : 'left';

      messagesString += `
          <div class="${containerClassName}">${message.content}</div>
        `;
    });

    return messagesString;
  }

  render() {
    return `
    <div class="message-container chats__message-container">
    ${this.getChat()}
    </div>
    `;
  }
}
export default ChatForm;
