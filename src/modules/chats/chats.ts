import Block from 'core/block';
import './chats.css';
import Validate from 'core/validation';

export class Chats extends Block {
  constructor() {
    const defaults = {
      values: {
        search: '',
        message: '',
      },
      errors: {
        search: '',
        message: '',
      },
    };
    super({
      ...defaults,
    });
  }
  protected getStateFromProps() {
    this.state = {
      values: {
        message: '',
        search: '',
      },
      errors: {
        message: '',
        searc: '',
      },
      handleErrors: (values: {[key: string]: number}, errors: {[key: string]: number}) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },
      onMessage: this.onMessage.bind(this),
    };

  }
  onMessage(e: Event) {
    e.preventDefault();
    if (this.formValid()) {
      console.log('submit', this.state.values);
    }
  }
  formValid() {
    let isValid = true;
    const newValues = { ...this.props.values };
    const newErrors = { ...this.props.errors };
    Object.keys(this.props.values).forEach((key) => {
      newValues[key] = (this.refs[key].querySelector('input') as HTMLInputElement).value;
      const messages = Validate(newValues[key], key);
      if (messages) {
        isValid = false;
        newErrors[key] = messages;
      }
    });
    this.state.handleErrors(newValues, newErrors);
    return isValid;
  }

  render() {
    const { values, errors } = this.state;
    return `
  <div class="chats">
      <div class="header chats__header">
        <p class="prfl chats__prfl">Profile > </p></br>
        {{{Input
          value="${values.search}"
          ref="search"
          id="search"
          type="text"
          placeholder="Search"
        }}}
        <div class="list chats__list" id="{{ chatsListId }}"></div>
      </div>
    <span class="span chats__span"></span>
    <div>
      <div class="profileSettings chats__profileSettings">
        <span class="photo chats__photo"></span>
        <p>Name</p>
        <p>⋮</p>
      </div>
      <span class="span-2 chats__span-2"></span>
      <div class="message-container chats__message-container"></div>
      <div>
        <span class="span-2 chats__span-2"></span>
        <div class="messages chats__messages" id="{{ messagesId }}">
            {{{Input
              value="${values.message}"
              error="${errors.message}"
              ref="message"
              id="message"
              type="text"
              placeholder="Message"
            }}}
          <div>
            {{{Button
              onClick=onMessage
              text="send"
            }}}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  }
}
