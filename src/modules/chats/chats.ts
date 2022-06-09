import Block from 'core/block';
import './chats.css';

export class Chats extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        message: '',
        text: '',
      },
      errors: {
        message: '',
        text: '',
      },
      onMessage: () => {
        const messageData = {
          message: (this.refs.message.firstElementChild as HTMLInputElement).value,
        };

        const nextState = {
          errors: {
            message: '',
          },
          values: { ...messageData },
        };

        this.setState(nextState);
      },
    };
  }

  render() {
    const { values } = this.state;
    return `
  <div class="chats">
            <div class="header chats__header">
              <p class="prfl chats__prfl">Profile > </p></br>
              {{{Input
                value="${values.text}"
                ref="search"
                id="search"
                type="text"
                placeholder="Search"
              }}}

              <div class="list chats__list" id="{{ chatsListId }}"></div>
            </div>
            <span class="span chats__span"></span>
            <div class="message-container chats__message-container">
              <div class="chats__messages" id="{{ messagesId }}">
              {{{Input
                value="${values.message}"
                ref="message"
                id="message"
                type="text"
                placeholder="Message"
              }}}
              </div>
              <div class="chats__form" id="{{ formId }}"></div>
            </div>
        </div>
  `;
  }
}
