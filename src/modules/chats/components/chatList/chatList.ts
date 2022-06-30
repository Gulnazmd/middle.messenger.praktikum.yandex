import Block from 'core/block';
import '../../chats.css';

interface IChatProps {
  id: number,
  title?: string,
  avatar?: string,
  unreadCount: number
}

interface IChatsListProps {
  chats: IChatProps[],
  activeChat: IChatProps,
  onChatClick: (id: number) => {},
}

interface IChatsListPropsWithEvents extends Omit<IChatsListProps, 'onChatClick'> {
  events: {
    click: EventListener,
  }
}

export class ChatList extends Block<IChatsListPropsWithEvents> {
  constructor(props: IChatsListProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const { target } = e;

          const item = (target as HTMLElement).closest('li') as HTMLLIElement;
          if (item) {
            const id = parseInt(item.dataset.id!, 10);
            props.onChatClick(id);
          }
        },
      },
    });
  }

  render() {
    return `
        <div class="header chats__header">
          <p onClick=onSettings class="prfl chats__prfl">Profile setting</p></br>
          {{{Input
            ref="search"
            id="search"
            type="text"
            placeholder="Search"
          }}}
          <div class="list chats__list">
          <ul class="names chats__names">
          ${this.props.chats.map((chat: IChatProps) => `
          <li
            class="list-item chats__list-item ${chat.id === this.props.activeChat?.id ? 'list-item chats__list-item_active' : ''}"
            ${chat.id}
            data-id=${chat.id}>
            <img src="${chat.avatar}" width="32" height="32">
            <span>${chat.title}</span>
          </li>
          `).join('')}
          </ul>
          </div>
        </div>
    `;
  }
}
