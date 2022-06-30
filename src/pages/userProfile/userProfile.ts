import Block from 'core/block';
import './userProfile.css';
import '../main.css';
import Validate from 'core/validation';
import { Dispatch, Store } from 'core/store';
import Router from 'core/router';
import { withRouter, withStore } from '../../utils';
import Views from './types/views';
import { getUser } from '../../services/profile';

interface IProfilePageProps {
  values: any;
  errors: any;
  router: Router;
  view?: Views,
  user: Nullable<User>,
  store: Store<AppState>;
  onLogout?: () => void;
  userLogin?: () => string | undefined;
  userName?: () => string | undefined;
  screenTitle?: () => string | undefined;
  dispatch: Dispatch<AppState>
};

class userProfile extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    super({
      ...props,
      view: Views.READ_ONLY,
    });
  }
  componentDidMount(): void {
    const { user } = this.props;

    if (!user) {
      this.props.dispatch(getUser);
    }
  }

  protected getStateFromProps(_props: IProfilePageProps) {
    this.state = {
      values: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        phone: '',
      },
      errors: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        phone: '',
      },
      handleErrors: (values: {[key: string]: number}, errors: {[key: string]: number}) => {
        const nextState = {
          errors,
          values,
        };
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
          <div class="title form__title">Profile settings</div>
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
            onClick=onChange
          }}} </br>
          {{{Link text="Change password" to="/"}}}
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


