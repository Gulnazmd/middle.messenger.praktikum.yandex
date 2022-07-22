import { Block } from '../../core';
import './deleteUser.css';

interface IDeleteUserProps {
  users: User[],
  deleteUser: (id: number) => void,
}

class DeleteUser extends Block<IDeleteUserProps> {
  protected getStateFromProps() {
    this.state = {
      onUserClick: this.handleUserClick.bind(this),
    };
  }

  handleUserClick(e: Event) {
    const button = e.target as HTMLElement;
    const { id } = button.dataset;

    if (id) {
      this.props.deleteUser(parseInt(id, 10));
    }
  }

  render() {
    return `
      <div>
        <div class="modal__backdrop"></div>
        <div class="modal">
          <h2 class="modal__title">Delete user</h2>
            <div class="delete-user__users-list">
              ${this.props.users.map((user: User) => `
                {{{ Button label="${user.login}" dataId=${user.id} onClick=onUserClick }}}
              `).join('')}
            </div>
        </div>
      </div>
    `;
  }
}

export default DeleteUser;
