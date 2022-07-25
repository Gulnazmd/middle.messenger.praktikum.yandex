import { Block } from 'core';
import './addUser.css';
import { User } from '../../types/user';

interface IAddUserProps {
  close: () => void,
  searchUser: (login: string) => void,
  searchResult: User[],
  addUser: (id: number) => void,
}

class AddUser extends Block<IAddUserProps> {
  protected getStateFromProps() {
    this.state = {
      onUserSearchClick: this.handleUserSearch.bind(this),
      onUserClick: this.handleUserClick.bind(this),
    };
  }

  handleUserSearch(e: Event) {
    e.preventDefault();

    const input = this.refs.name as HTMLInputElement;

    if (input) {
      this.props.searchUser(input.value);
    }
  }

  handleUserClick(e: Event) {
    const button = e.target as HTMLElement;
    const { id } = button.dataset;

    if (id) {
      this.props.addUser(parseInt(id, 10));
    }
  }

  render() {
    return `
      <div>
        <div class="backdrop modal__backdrop"></div>
        <div class="modal">
        {{{Link text="close" onClick=close}}}
          <h2 class="title modal__title">Add user</h2>
          {{#if ${this.props.searchResult.length > 0}}}
            <div class="add-user modal__add-user">
              ${this.props.searchResult.map((user: User) => `
                {{{ Button text="${user.login}" dataId=${user.id} onClick=onUserClick }}}
              `).join('')}
            </div>
          {{else}}
            <form class="search-form modal__search-form">
              {{{ Input ref="name" placeholder="Login search" }}}
              {{{ Button text="Choose" type="submit" onClick=onUserSearchClick }}}
            </form>
          {{/if}}
        </div>
      </div>
    `;
  }
}

export default AddUser;
