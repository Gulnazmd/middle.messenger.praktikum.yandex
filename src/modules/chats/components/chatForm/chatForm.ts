import Block from 'core/block';
import '../../chats.css';


export class ChatForm extends Block {

  render() {
    return `
    <div class="message-container chats__message-container"></div>
    `;
  }
}