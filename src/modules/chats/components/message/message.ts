import Block from 'core/block';
import '../../chats.css';
import { Dispatch, Router } from 'core';
import Validate from 'core/validation';
import { sendMessage } from 'services/sockets';
import { withRouter, withStore } from 'utils';

interface IMessageProps {
  chats: Chat[],
  searchResult: User[],
  dispatch: Dispatch<AppState>
  router: Router,
  messages: Message[],
  user: Nullable<User>,
}

export class MessageEditor extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super({
      ...props,
    });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        message: '',
      },
      errors: {
        message: '',
      },
      handleErrors: (values: {[key: string]: number}, errors: {[key: string]: number}) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },
      onMessage: this.onMessageSend.bind(this),
    };
  }

  formValid() {
    let isValid = true;
    const newValues = { ...this.state.values };
    const newErrors = { ...this.state.errors };
    Object.keys(this.state.values).forEach((key) => {
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

  onMessageSend() {
    const inputElement = document.querySelector('#message') as HTMLInputElement;
    if (inputElement && inputElement.value !== '') {
      this.props.dispatch(sendMessage, {
        message: inputElement.value,
      });
      inputElement.value = '';
    }
  }

  protected render(): string {
    const { values, errors } = this.state;
    return `
        <div class="messages chats__messages">
            {{{Field
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
    `;
  }
}
function mapStateToProps(state: AppState) {
  return {
    chats: state.chats,
    searchResult: state.searchResult,
    chatUsers: state.chatUsers,
    messages: state.messages,
    user: state.user,
  };
}

export default withRouter<IMessageProps>(
  withStore<IMessageProps>(
    MessageEditor,
    mapStateToProps,
  ),
);
