import { AppState } from 'types/appState';
import { User } from 'types/user';
import Block from 'core/block';
import '../main.css';
import Validate from 'core/validation';
import { Dispatch, Store } from 'core/store';
import Router from 'core/router/router';
import { Screens } from 'core/screens';
import { registerComponent } from 'core';
import ChangePassword from 'components/changePassword/changePassword';
import { withRouter, withStore } from '../../utils';
import {
  getUser, changeUserProfile, changeAvatar, changePassword,
} from '../../services/profile';
import { logout } from '../../services/auth';

registerComponent(ChangePassword, 'ChangePassword');

interface IProfilePageProps {
  router: Router;
  user: User | null,
  store: Store<AppState>,
  isPasswordWindowClosed: boolean
  onLogout?: () => void,
  userLogin?: () => string | undefined,
  userName?: () => string | undefined,
  screenTitle?: () => string | undefined,
  dispatch: Dispatch<AppState>
}

class userProfile extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    super({
      ...props,
    });
  }

  componentDidMount(): void {
    const { user } = this.props;

    if (!user) {
      this.props.dispatch(getUser);
    }
  }

  protected getStateFromProps(props: IProfilePageProps) {
    this.state = {
      values: {
        firstName: props.user?.firstName,
        secondName: props.user?.secondName,
        displayName: props.user?.displayName,
        login: props.user?.login,
        email: props.user?.email,
        phone: props.user?.phone,
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
          alert('Success');
        }
      },
      onExit: (e: MouseEvent) => {
        e.preventDefault();
        this.props.dispatch(logout);
      },

      handleBackToChats: () => {
        this.props.router.go(Screens.CHATSPAGE);
      },

      handleErrors: (values: {[key: string]: number}, errors: {[key: string]: number}) => {
        const nextState = {
          ...this.state,
        };

        nextState.errors = errors;
        nextState.values = values;

        this.setState(nextState);
      },
      onPasswordSubmit: () => {
        const data = {
          oldPassword: 'test123123esQfs',
          newPassword: 'test123123esQfs1~',
        };
        this.props.dispatch(changePassword, data);
      },
      onChange: this.onChange.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      onAvatarChange: this.handleAvatarChange.bind(this),
      changePassword: (title: string) => this.props.dispatch(changePassword, { title }),
      isPasswordWindowOpen: false,
      onChangePasswordWindowClose: this.onChangePasswordWindow.bind(this, false),
      onChangePasswordWindowOpen: this.onChangePasswordWindow.bind(this, true),
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

  handleAvatarChange() {
    const formData = new FormData(document.querySelector('#avatar__file-upload') as HTMLFormElement);
    this.props.dispatch(changeAvatar, formData);
  }

  onChangePasswordWindow(isOpen: boolean) {
    this.setState({
      ...this.state,
      isPasswordWindowOpen: isOpen,
    });
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
    const avatarImg = this.props.user?.avatar ?? '';
    return `
      <div>
        <form action="" method="post" class="form">
          <div class="title form__title">Profile settings</div>
          {{#if isPasswordWindowOpen}}
              {{{ ChangePassword changePassword=changePassword onPasswordSubmit=onPasswordSubmit close=onChangePasswordWindowClose}}}
          {{/if}}
          {{{Avatar imageUrl="${avatarImg}" onChange=onAvatarChange}}}
          <p class="name form__name">${values.firstName}</p>
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
          {{{ Button
            text="Save"
            onClick=onSubmit
          }}} </br>
          {{{ Button text="Back to chats" onClick=handleBackToChats }}}
          <div>
            {{{ Link text="Change password" onClick=onChangePasswordWindowOpen }}}</br>
            {{{ Link text="Exit" onClick=onExit }}}
          </div>
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
