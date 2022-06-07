import Block from '../../core/block';
import '../main.css'

export class RegPage extends Block {
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
      onRegister: () => {
        const regData = {
          first_name: (this.refs.first_name.firstElementChild as HTMLInputElement).value,
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement).value,

        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...regData },
        };

        if (!regData.login) {
          nextState.errors.login = 'Login is required';
        } else if (regData.login.length < 4) {
          nextState.errors.login = 'Login should contain more than 3 chars';
        }

        if (!regData.password) {
          nextState.errors.password = 'Password is required';
        }

        this.setState(nextState);

        console.log('action/login', regData);
      }
    }
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
    <form action="" method="post" class="form">
    <div class="title form__title">Sign In</div>

    {{{Input
      label: 'first name'
      value="${values.first_name}"
      error="${errors.first_name}"
      ref="first_name"
      id="first_name"
      type="text"
      placeholder="first name"
    }}}
    {{{Input
      label: 'second name'
      value="${values.second_name}"
      error="${errors.second_name}"
      ref="second name"
      id="second name"
      type="text"
      placeholder="second name
    }}}
    {{{Input
      value="${values.login}"
      error="${errors.login}"
      label: 'Login'
      ref="login"
      id="login"
      type="text"
      placeholder="Login"
    }}}
    {{{Input
      value="${values.email}"
      error="${errors.email}"
      label: 'email'
      ref="email"
      id="email"
      type="email"
      placeholder="email"
    }}}
    {{{Input
      value="${values.password}"
      error="${errors.password}"
      label: 'Password'
      ref="password"
      id="password"
      type="password"
      placeholder="Password"
    }}}
    {{{Input
      value="${values.password2}"
      error="${errors.password2}"
      label: 'repeat password'
      ref="password2"
      id="password2"
      type="password"
      placeholder="Password"
    }}}
    {{{Input
      value="${values.phone}"
      error="${errors.phone}"
      label: 'phone'
      ref="phone"
      id="phone"
      type="number"
      placeholder="phone"
    }}}

    {{{Button
      text="Register"
      onClick=onRegister
    }}}
    <small>You have an account?</small>
    <a class="my-link" href="../login/login.html">
      Sign In
    </a>
</form>
    `;
  }
}
