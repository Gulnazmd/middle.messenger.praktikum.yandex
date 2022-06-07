import Block from '../../core/Block';
import '../../pages/main.css'

export class LoginPage extends Block {
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
      onLogin: () => {
        const loginData = {
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement).value
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };

        if (!loginData.login) {
          nextState.errors.login = 'Login is required';
        } else if (loginData.login.length < 4) {
          nextState.errors.login = 'Login should contain more than 3 chars';
        }

        if (!loginData.password) {
          nextState.errors.password = 'Password is required';
        }

        this.setState(nextState);

        console.log('action/login', loginData);
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
      value="${values.login}"
      error="${errors.login}"
      label='Login'
      ref="login"
      id="login"
      type="text"
      placeholder="Login"
    }}}
    {{{Input
      value="${values.password}"
      error="${errors.password}"
      label='Password'
      ref="password"
      id="password"
      type="password"
      placeholder="Password"
    }}}

    {{{Button
      text="Sign In"
      onClick=onLogin
    }}}
    <small>You don't have an account?</small>
    {{{Link text="Register" to="/registration"}}}
</form>
    `;
  }
}