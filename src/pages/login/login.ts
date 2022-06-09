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

  protected getStateFromProps(_props: any) {
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
    };
  }

  onSubmit(e: Event) {
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
      const message = Validate(newValues[key], key);
      if (message) {
        isValid = false;
        newErrors[key] = message;
      }
    });
    this.state.handleErrors(newValues, newErrors);
    return isValid;
  }

  render() {
    const { errors, values } = this.state;

    return `
    <div>
        <form action="" method="post" class="form">
        <div class="title form__title">Sign In</div>

        {{{Input
          value="${values.login}"
          error="${errors.login}"
          label='Login'
          ref="login"
          id="login"
          type="text"
          placeholder="Login"
          onChange=onChange
        }}}
        {{{Input
          value="${values.password}"
          error="${errors.password}"
          label='Password'
          ref="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange=onChange
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
