import Block from '../../../../core/block';
import Router from '../../../../core/router/router';
import { Screens } from '../../../../core/screens';
import { Dispatch } from '../../../../core/store';
import { createChat, searchUser } from '../../../../services/chats';
import { withRouter, withStore } from '../../../../utils';
import '../../chats.css';

interface IChatProps {
  id: number,
  title?: string,
  avatar?: string,
}

interface IChatsListProps {
  chats: IChatProps[],
  activeChat: IChatProps,
  onChatClick: (id: number) =>{},
  dispatch: Dispatch<AppState>
  router: Router,
  messages: Message[],
  user: Nullable<User>,
  unreadCount: number
}

interface IChatsListPropsWithEvents extends Omit<IChatsListProps, 'onChatClick'> {
  events: {
    click: EventListener,
  }
}

class ChatList extends Block<IChatsListPropsWithEvents> {
  constructor(props: IChatsListProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
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

  protected getStateFromProps() {
    this.state = {
      onProfilePage: () => this.props.router.go(Screens.PROFILEPAGE),
      onCreateChatOpen: this.onCreateChat.bind(this, true),
      onCreateChatClose: this.onCreateChat.bind(this, false),
      showCreateChat: false,
      createChat: (title: string) => this.props.dispatch(createChat, { title }),
      searchUser: (login: string) => {
        this.props.dispatch(searchUser, { login, chatId: this.state.activeChat.id });
      },
    };
  }

  onCreateChat(isOpen: boolean) {
    this.setState({
      ...this.state,
      showCreateChat: isOpen,
    });
  }

  render() {
    return `
        <div class="header chats__header">
        {{#if showCreateChat }}
          {{{ AddChat close=onCreateChatClose createChat=createChat }}}
        {{/if}}
        {{{ Link text="Profile settings" onClick=onProfilePage }}}</br>
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
            <span class="userName chats__userName">${chat.title}</span>
            <span class="span-3 chats__span-3"></span>
          </li>
          `).join('')}
          </ul>
          </div>
          <div class="footer chats__footer">
            {{{ Button text="New chat" onClick=onCreateChatOpen }}}
          </div>
        </div>
    `;
  }
}
function mapStateToProps(state: AppState) {
  return {
    chats: state.chats,
    searchResult: state.searchResult,
    chatUsers: state.chatUsers,
    messages: state.messages,
    user: state.user,
  };
}

export default withRouter<IChatsListPropsWithEvents>(
  withStore<IChatsListPropsWithEvents>(
    ChatList,
    mapStateToProps,
  ),
);
