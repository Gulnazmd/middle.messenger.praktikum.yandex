import Block from 'core/block';
import './userProfile.css';
import '../main.css';
import Validate from 'core/validation';
import { Dispatch, Store } from 'core/store';
import Router from 'core/router';
import { withRouter, withStore } from '../../utils';
import { getUser, changeUserProfile} from '../../services/profile';
import { logout } from '../../services/auth';
import { Screens } from 'core/screens';

interface IProfilePageProps {
  router: Router;
  user: Nullable<User>,
  store: Store<AppState>;
  onLogout?: () => void;
  userLogin?: () => string | undefined;
  userName?: () => string | undefined;
  screenTitle?: () => string | undefined;
  dispatch: Dispatch<AppState>
};

class userProfile extends Block<IProfilePageProps> {

  componentDidMount(): void {
    const { user } = this.props;

    if (!user) {
      this.props.dispatch(getUser);
    }
  }

  protected getStateFromProps(_props: IProfilePageProps) {
    this.state = {
      values: {
        firstName: _props.user?.firstName,
        secondName: _props.user?.secondName,
        displayName:  _props.user?.displayName,
        login:  _props.user?.login,
        email:  _props.user?.email,
        phone:  _props.user?.phone,
      },
      errors: {
        firstName: '',
        secondName: '',
        displayName: '',
        login: '',
        email: '',
        phone: '',
      },
      onSubmit: () => {
        if (this.formValid()) {
          console.log('submit', this.state.values);
          const profileData = this.state.values;
          this.props.dispatch(changeUserProfile, profileData);
        }
      },
      onExit: (e: MouseEvent) => {
        this.props.dispatch(logout);
        e.preventDefault();
      },

      onChangePassword: () => {
       this.props.router.go(Screens.Password)
      },

      handleErrors: (values: {[key: string]: number}, errors: {[key: string]: number}) => {
        const nextState = {
          ...this.state,
        };

        nextState.errors = errors;
        nextState.values = values;

        this.setState(nextState);
      },
      onChange: this.onChange.bind(this),
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

  onChange(e: Event) {
    e.preventDefault();
    if (this.formValid()) {
      console.log('submit', this.state.values);
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
    this.state.handleErrors(newValues, newErrors);
    return isValid;
}

  render() {
    const { errors, values } = this.state;
    return `
      <div>
        <form action="" method="post" class="form">
          <div class="title form__title">Profile settings</div>
          {{{Avatar}}}
          {{{Field
            label= 'First name'
            value="${values.firstName}"
            error="${errors.firstName}"
            ref="firstName"
            id="firstName"
            type="text"
            placeholder="firstname"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            label= 'Second name'
            value="${values.secondName}"
            error="${errors.secondName}"
            ref="secondName"
            id="secondName"
            type="text"
            placeholder="secondname"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{Field
            label= 'Display name'
            value="${values.displayName}"
            error="${errors.displayName}"
            ref="displayName"
            id="displayName"
            type="text"
            placeholder="displayName"
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
            text="Save"
            onClick=onSubmit
          }}} </br>
          {{{Link text="Change password" onClick=onChangePassword}}}
          {{{Link text="Exit" onClick=onExit}}}
      </form>
    </div>
        `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    user: state.user,
  };
}

export default withRouter<IProfilePageProps>(
  withStore<IProfilePageProps>(
    userProfile,
    mapStateToProps,
  ),
);


