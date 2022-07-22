import Block from 'core/block';
import './chats.css';
import {
  addUserToChat, deleteChat, deleteUserFromChat, getChats, getChatUsers, searchUser,
} from 'services/chats';
import { createConnection } from 'services/sockets';
import { IDropdownItem } from 'components/dropdown/components/dropdownItem';
import { AddChat } from 'components/addChat';
import { AddUser } from 'components/addUser';
import { withRouter, withStore } from '../../utils';
import { Dispatch, registerComponent, Router } from '../../core';
import { ChatForm } from './components/chatForm';
import { ChatList } from './components/chatList';
import { MessageEditor } from './components/message';

registerComponent(MessageEditor, 'MessageEditor');
registerComponent(ChatList, 'ChatList');
registerComponent(ChatForm, 'ChatForm');
registerComponent(AddChat, 'AddChat');
registerComponent(AddUser, 'AddUser');

interface IChatsProps {
  chats: Chat[],
  searchResult: User[],
  dispatch: Dispatch<AppState>
  router: Router,
  messages: Message[],
  user: Nullable<User>,
  chatMenu: IDropdownItem[],
}

class ChatsPage extends Block<IChatsProps> {
  constructor(props: IChatsProps) {
    super({
      ...props,
    });
    const chatMenu = [
      {
        title: 'Add user',
        onClick: () => this.onAddUserWindow(true),
      },
      {
        title: 'Delete user',
        onClick: () => this.onDeleteUserWindow(true),
      },
      {
        title: 'Delete chat',
        onClick: () => this.onDeleteChat(),
      },
    ];

    this.setProps({
      ...this.props,
      chatMenu,
    });

    this.props.dispatch(getChats);
  }

  handleChatClick(chatId: number) {
    this.props.dispatch({ messages: [] });

    const currentChat = this.props.chats
      .find((chat: Chat) => chat.id === chatId) as Chat;

    this.props.dispatch(createConnection, { chatId });

    this.props.dispatch(getChatUsers, {
      chatId,
    });

    const newState = {
      ...this.state,
      activeChat: currentChat,
    };

    this.setState(newState);
  }

  protected getStateFromProps() {
    this.state = {
      showAddUser: false,
      showDeleteUser: false,
      activeChat: null,
      onChatClick: this.handleChatClick.bind(this),
      onAddUserOpen: this.onAddUserWindow.bind(this, true),
      onAddUserClose: this.onAddUserWindow.bind(this, false),
      onDeleteUserOpen: this.onDeleteUserWindow.bind(this, true),
      onDeleteUserClose: this.onDeleteUserWindow.bind(this, false),
      addUser: this.handleAddUser.bind(this),
      deleteUser: this.handleDeleteUser.bind(this),
      searchUser: (login: string) => {
        this.props.dispatch(searchUser, { login, chatId: this.state.activeChat.id });
      },
    };
  }

  onAddUserWindow(isOpen: boolean) {
    this.setState({
      ...this.state,
      showAddUser: isOpen,
    });
    this.props.dispatch({
      searchResult: [],
    });
  }

  onDeleteUserWindow(isOpen: boolean) {
    this.setState({
      ...this.state,
      showDeleteUser: isOpen,
    });
  }

  handleAddUser(id: number) {
    this.props.dispatch(addUserToChat, {
      users: [id],
      chatId: this.state.activeChat.id,
    });
    this.onAddUserWindow(false);
  }

  onDeleteChat() {
    this.props.dispatch(deleteChat, { chatId: this.state.activeChat.id });
    this.setState({
      ...this.state,
      activeChat: null,
    });
  }

  handleDeleteUser(userId: number) {
    this.props.dispatch(deleteUserFromChat, {
      users: [
        userId,
      ],
      chatId: this.state.activeChat.id,
    });

    this.setState({
      ...this.state,
      showDeleteUser: false,
    });
  }

  render() {
    const { activeChat } = this.state;
    return `
  <div class="chats">
  {{{ChatList chats=chats onChatClick=onChatClick activeChat=activeChat}}}</br>
  <span class="span chats__span"></span>
  <div class="emptyDiv chats__emptyDiv">
    {{#if activeChat}}
    {{#if showAddUser }}
          {{{ AddUser close=onAddUserClose searchUser=searchUser searchResult=searchResult addUser=addUser }}}
    {{/if}}
    {{#if showDeleteUser }}
          {{{ DeleteUser close=onDeleteUserClose users=chatUsers deleteUser=deleteUser }}}
    {{/if}}
      <div class="profileSettings chats__profileSettings">
        <img src="${activeChat?.avatar}" class="photo chats__photo"></img>
        <p class="name chats__name">${activeChat?.title}</p>
        {{{ Dropdown items=chatMenu }}}
      </div>
      <span class="span-2 chats__span-2"></span>
      {{{ChatForm messages=messages}}}
      <div>
        <span class="span-2 chats__span-2"></span>
        {{{MessageEditor}}}
      </div>
      {{else}}
      <div class="empty chats__empty">
       <p class="empty-title chats__empty-title"> Select the chat to start messaging </p>
      </div>
      {{/if}}
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

export default withRouter<IChatsProps>(
  withStore<IChatsProps>(
    ChatsPage,
    mapStateToProps,
  ),
);
