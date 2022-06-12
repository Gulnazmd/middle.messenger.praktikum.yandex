import Block from 'core/block';
import Validate from 'core/validation';
import 'pages/main.css';

export class LoginPage extends Block {
  constructor() {
    const defaults = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
    };
    super({
      ...defaults,
    });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      handleErrors: (values: {[key: string]: number}, errors: {[key: string]: number}) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },
      onSubmit: this.onSubmit.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
    };
  }

  onFocus(e: Event) {
    if (e.target) {
      const element = e.target as HTMLInputElement;
      if (element.classList.contains('field__input__error')) {
        const newValues = { ...this.state.values };
        const newErrors = { ...this.state.errors };
        newValues[element.id] = element.value;
        newErrors[element.id] = '';
        this.state.handleErrors(newValues, newErrors);
      }
    }
  }

  onBlur(e: Event) {
    if (e.target) {
      const element = e.target as HTMLInputElement;
      if (!element.classList.contains('field__input__error')) {
        const message = Validate(element.value, element.id);
        const newValues = { ...this.state.values };
        const newErrors = { ...this.state.errors };
        newValues[element.id] = element.value;
        if (message) {
          newErrors[element.id] = message;
        }
        this.state.handleErrors(newValues, newErrors);
      }
    }
  }

  formValid() {
    let isValid = true;
    const newValues = { ...this.props.values };
    const newErrors = { ...this.props.errors };
    Object.keys(this.props.values).forEach((key) => {
      newValues[key] = (this.refs[key].querySelector('input') as HTMLInputElement).value;
      const message = Validate(newValues[key], key);
      if (message) {
        isValid = false;
        newErrors[key] = message;
      }
    });
    this.state.handleErrors(newValues, newErrors);
    return isValid;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.formValid()) {
      console.log('submit', this.state.values);
      window.location.href = '/chats';
    }
  }

  render() {
    const { errors, values } = this.state;

    return `
    <div>
        <form action="" method="post" class="form">
        <div class="title form__title">Sign In</div>

        {{{Field
          value="${values.login}"
          error="${errors.login}"
          label='Login'
          ref="login"
          id="login"
          type="text"
          placeholder="Login"
          onFocus=onFocus
          onBlur=onBlur
        }}}
        {{{Field
          value="${values.password}"
          error="${errors.password}"
          label='Password'
          ref="password"
          id="password"
          type="password"
          placeholder="Password"
          onFocus=onFocus
          onBlur=onBlur
        }}}

        {{{Button
          text="Sign In"
          onClick=onSubmit
        }}} </br>
        <small>You don't have an account?</small>
        {{{Link text="Register" to="./registration"}}}
    </form>
    </div>
        `;
  }
}
