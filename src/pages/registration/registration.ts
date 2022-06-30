import Block from 'core/block';
import '../main.css';
import Validate from 'core/validation';
import { Dispatch, Router } from 'core';
import { Screens } from 'core/screens';
import { signup } from '../../services/auth';
import { withRouter, withStore } from '../../utils';

interface IRegPageProps {
  values: any;
  errors: any;
  router: Router,
  isLoading: boolean,
  signupFormError: string,
  formError?: () => string | null,
  dispatch: Dispatch<AppState>
}

class RegPage extends Block<IRegPageProps> {
  constructor(props: IRegPageProps) {
    super(props);
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
      handleErrors: (values: { [key: string]: number }, errors: { [key: string]: number }) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },

      goToSignIn: {
        onClick: () => this.props.router.go(Screens.Login)
      },

      onSubmit: () => {
        if (this.formValid()) {
          console.log('submit', this.state.values);
          const loginData = this.state.values;
          this.props.dispatch(signup, loginData);
        }
      },

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

  render() {
    const { errors, values } = this.state;

    return `
      <div>
        <form action="" method="post" class="form">
          <div class="title form__title">Sign In</div>
          {{{Field
            label= 'First name'
            value="${values.first_name}"
            error="${errors.first_name}"
            ref="first_name"
            id="first_name"
            type="text"
            placeholder="firstname"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            label= 'Second name'
            value="${values.second_name}"
            error="${errors.second_name}"
            ref="second_name"
            id="second_name"
            type="text"
            placeholder="secondname"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            value="${values.login}"
            error="${errors.login}"
            label= 'Login'
            ref="login"
            id="login"
            type="text"
            placeholder="Login"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            value="${values.email}"
            error="${errors.email}"
            label= 'Email'
            ref="email"
            id="email"
            type="email"
            placeholder="email"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            value="${values.password}"
            error="${errors.password}"
            label= 'Password'
            ref="password"
            id="password"
            type="password"
            placeholder="Password"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            value="${values.password2}"
            error="${errors.password2}"
            label= 'Repeat password'
            ref="password2"
            id="password2"
            type="password"
            placeholder="Password"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            value="${values.phone}"
            error="${errors.phone}"
            label= 'Phone'
            ref="phone"
            id="phone"
            type="text"
            placeholder="phone"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Button
            text="Register"
            onClick=onSubmit
          }}} </br>
          <small>You have an account?</small>
          {{{Link text="Sign In" to="goToSignIn"}}}
      </form>
    </div>
        `;
  }
}
function mapStateToProps(state: AppState) {
  return {
    isLoading: state.isLoading,
    signupFormError: state.signupFormError,
  };
}

export default withRouter<IRegPageProps>(
  withStore<IRegPageProps>(
    RegPage,
    mapStateToProps,
  ),
);
