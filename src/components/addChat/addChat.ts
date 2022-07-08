import { Block } from 'core';
import './addChat.css';

interface IAddChatProps {
  close: () => void,
  createChat: (name: string) => void,
}

class AddChat extends Block<IAddChatProps> {
  protected getStateFromProps() {
    this.state = {
      close: this.props?.close(),
      onCreateChatClick: this.handleCreateChat.bind(this),
    };
  }

  handleCreateChat(e: Event) {
    e.preventDefault();

    const nameInput = this.refs.name as HTMLInputElement;

    if (nameInput) {
      this.props.createChat(nameInput.value);
      this.props.close();
    }
    console.log(nameInput);
  }

  render() {
    return `
      <div>
        <div class="backdrop modal__backdrop"></div>
        <div class="modal">
          <h2 class="title modal__title">Create chat</h2>
            {{{ Input ref="name" placeholder="Name" }}}
            {{{ Button text="Create new chat" type="submit" onClick=onCreateChatClick }}}
            {{{ Button text="Close" onClick=close}}}
        </div>
      </div>
    `;
  }
}

export default AddChat;
