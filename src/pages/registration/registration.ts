import Block from 'core/block';
import '../main.css';

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
          second_name: (this.refs.second_name.firstElementChild as HTMLInputElement).value,
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          email: (this.refs.email.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement).value,
          password2: (this.refs.password2.firstElementChild as HTMLInputElement).value,
          phone: (this.refs.phone.firstElementChild as HTMLInputElement).value,
        };

        const nextState = {
          errors: {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            password: '',
            password2: '',
            phone: '',
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
        if (!regData.email) {
          nextState.errors.email = 'Email is required';
        }

        this.setState(nextState);
      },
    };
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
          }}}
          {{{Input
            label= 'Second name'
            value="${values.second_name}"
            error="${errors.second_name}"
            ref="second_name"
            id="second_name"
            type="text"
            placeholder="secondname"
          }}}
          {{{Input
            value="${values.login}"
            error="${errors.login}"
            label= 'Login'
            ref="login"
            id="login"
            type="text"
            placeholder="Login"
          }}}
          {{{Input
            value="${values.email}"
            error="${errors.email}"
            label= 'Email'
            ref="email"
            id="email"
            type="email"
            placeholder="email"
          }}}
          {{{Input
            value="${values.password}"
            error="${errors.password}"
            label= 'Password'
            ref="password"
            id="password"
            type="password"
            placeholder="Password"
          }}}
          {{{Input
            value="${values.password2}"
            error="${errors.password2}"
            label= 'Repeat password'
            ref="password2"
            id="password2"
            type="password"
            placeholder="Password"
          }}}
          {{{Input
            value="${values.phone}"
            error="${errors.phone}"
            label= 'Phone'
            ref="phone"
            id="phone"
            type="number"
            placeholder="phone"
          }}}
          {{{Button
            text="Register"
            onClick=onRegister
          }}} </br>
          <small>You have an account?</small>
          {{{Link text="Sign In" to="/"}}}
      </form>
    </div>
        `;
  }
}
