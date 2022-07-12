import { Block, Dispatch } from 'core';
import './changePassword.css';

interface IChangePasswordProps {
  dispatch: Dispatch<AppState>,
  close: () => void,
  changePassword: () => void,
  onPasswordSubmit: () => void,
}

class ChangePassword extends Block<IChangePasswordProps> {
  protected getStateFromProps() {
    this.state = {
      onPasswordSubmit: this.props?.onPasswordSubmit,
      close: this.props?.close()
    };
  }

  render() {
    return `
      <div>
        <div class="backdrop modal__backdrop"></div>
        <div class="modal">
          <h2 class="title modal__title">Create chat</h2>
            {{{Field
            label="Old password"
            id="oldPassword"
            name="oldPassword"
            ref="oldPassword"
            type="text"
            placeholder="oldPassword"
            value=""}}}
            {{{ Field label="New password"
            id="newPassword"
            name="newPassword"
            ref="newPassword"
            type="text"
            placeholder="newPassword"
            value=""}}}
            {{{ Button text="Change password" type="submit" onClick=onPasswordSubmit }}}
            {{{ Button text="Close" onClick=close}}}
        </div>
      </div>
    `;
  }
}

export default ChangePassword;
