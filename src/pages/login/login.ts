import { Block } from 'core';
import Validate from 'core/validation';
import 'pages/main.css';
import { Router, Dispatch} from 'core';
import { Screens } from 'core/screens';
import { withStore, withRouter } from '../../utils';
import { loginService } from '../../services/auth';

interface ILoginProps {
  router: Router;
  dispatch: Dispatch<AppState>,
  loginFormError: string;
  formError?: () => string | null;
}


class LoginPage extends Block<ILoginProps>{
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

      goSignUp: {
        onClick: () => this.props.router.go(Screens.RegPage)
      },

      onSubmit: () => {
        if (this.formValid()) {
          console.log('submit', this.state.values);
          const loginData = this.state.values;
          this.props.dispatch(loginService, loginData);
        }
      },

      handleErrors: (values: { [key: string]: number }, errors: { [key: string]: number }) => {

        const nextState = {
          ...this.state,
        };

        nextState.errors = errors;
        nextState.values = values;

        this.setState(nextState);
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
    const newValues = { ...this.state.values };
    const newErrors = { ...this.state.errors };
    Object.keys(this.state.values).forEach((key) => {
      newValues[key] = (this.refs[key].querySelector('input') as HTMLInputElement).value;
      const message = Validate(newValues[key], key);
      if (message) {
        isValid = false;
        newErrors[key] = message;
      }
    });
    if (!isValid) {
      this.state.handleErrors(newValues, newErrors);
    }
    return isValid;
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
        {{{Link text="Register" to=goSignUp}}}
    </form>
    </div>
        `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    isLoading: state?.isLoading,
    loginFormError: state.loginFormError,
  };
}

export default withRouter<ILoginProps>(
  withStore<ILoginProps>(
    LoginPage,
    mapStateToProps,
  ),
);