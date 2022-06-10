import Block from 'core/block';
import '../main.css';
import Validate from 'core/validation';

export class RegPage extends Block {
  constructor() {
    const defaultValues = {
      values: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
      },
      errors: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
      },
    };
    super({
      ...defaultValues,
    });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
      },
      errors: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
      },
      errorsHandle: (values: { [key: string]: number }, errors: { [key: string]: number }) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },
      submit: this.submit.bind(this),
    };
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.validForm()) {
      console.log('submit', this.state.values);
    }
  }

  validForm() {
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
    this.state.errorsHandle(newValues, newErrors);
    return isValid;
  }

  render() {
    const { errors, values } = this.state;

    return `
      <div>
        <form action="" method="post" class="form">
          <div class="title form__title">Sign In</div>
          {{{Input
            label= 'First name'
            value="${values.first_name}"
            error="${errors.first_name}"
            ref="first_name"
            id="first_name"
            type="text"
            placeholder="firstname"
            onChange=onChange
          }}}
          {{{Input
            label= 'Second name'
            value="${values.second_name}"
            error="${errors.second_name}"
            ref="second_name"
            id="second_name"
            type="text"
            placeholder="secondname"
            onChange=onChange
          }}}
          {{{Input
            value="${values.login}"
            error="${errors.login}"
            label= 'Login'
            ref="login"
            id="login"
            type="text"
            placeholder="Login"
            onChange=onChange
          }}}
          {{{Input
            value="${values.email}"
            error="${errors.email}"
            label= 'Email'
            ref="email"
            id="email"
            type="email"
            placeholder="email"
            onChange=onChange
          }}}
          {{{Input
            value="${values.password}"
            error="${errors.password}"
            label= 'Password'
            ref="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange=onChange
          }}}
          {{{Input
            value="${values.password2}"
            error="${errors.password2}"
            label= 'Repeat password'
            ref="password2"
            id="password2"
            type="password"
            placeholder="Password"
            onChange=onChange
          }}}
          {{{Input
            value="${values.phone}"
            error="${errors.phone}"
            label= 'Phone'
            ref="phone"
            id="phone"
            type="text"
            placeholder="phone"
            onChange=onChange
          }}}
          {{{Button
            text="Register"
            onClick=submit
          }}} </br>
          <small>You have an account?</small>
          {{{Link text="Sign In" to="/"}}}
      </form>
    </div>
        `;
  }
}
