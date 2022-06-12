import Block from 'core/block';
import '../../chats.css';
import Validate from 'core/validation';

export class Message extends Block {
  constructor() {
    const defaults = {
      values: {
        message: '',
      },
      errors: {
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

  protected render(): string {
    const { values, errors } = this.state;
    return `
        <div class="messages chats__messages">
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
    `;
  }
}
