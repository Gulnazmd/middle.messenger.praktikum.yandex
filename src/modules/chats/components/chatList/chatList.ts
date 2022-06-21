import Block from 'core/block';
import '../../chats.css';

export class ChatList extends Block {
  render() {
    return `
        <div class="header chats__header">
          <p class="prfl chats__prfl">Profile > </p></br>
          {{{Input
            ref="search"
            id="search"
            type="text"
            placeholder="Search"
          }}}
          <div class="list chats__list"></div>
        </div>
    `;
  }
}
