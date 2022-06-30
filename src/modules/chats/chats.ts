import Block from 'core/block';
import './chats.css';
import { Dispatch, registerComponent, Router } from 'core';
import Message from './components/message';
import ChatList from './components/chatList';
import ChatForm from './components/chatForm';
import { getChats } from '../../services/chats';
import { withRouter, withStore } from '../../utils';

registerComponent(Message, 'Message');
registerComponent(ChatList, 'ChatList');
registerComponent(ChatForm, 'ChatForm');

interface IChatsProps {
  chats: Chat[],
  searchResult: User[],
  dispatch: Dispatch<AppState>
  router: Router,
  messages: Message[],
  user: Nullable<User>,
}

class ChatsPage extends Block<IChatsProps> {
  constructor(props: IChatsProps) {
    super({
      ...props,
    });
    const chatMenu = [
      {
        title: 'Add user',
        onClick: () => this.toggleAddUserWindow(true),
      },
      {
        title: 'Delete user',
        onClick: () => this.toggleDeleteUserWindow(true),
      },
      {
        title: 'Delete chat',
        onClick: () => this.handleDeleteChat(),
      },
    ];

    this.setProps({
      ...this.props,
      chatMenu,
    });

    this.props.dispatch(getChats);
  }


  render() {

      return `
  <div class="chats">
      {{{ChatList}}}
    <span class="span chats__span"></span>
    <div>
      <div class="profileSettings chats__profileSettings">
        <span class="photo chats__photo"></span>
        <p class="name chats__name">Name</p>
        <button class="chats__settingButton">⋮</button>
      </div>
      <span class="span-2 chats__span-2"></span>
      {{{ChatForm}}}
      <div>
        <span class="span-2 chats__span-2"></span>
        {{{Message}}}
      </div>
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