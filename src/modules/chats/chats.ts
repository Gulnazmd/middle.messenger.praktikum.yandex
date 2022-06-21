import Block from 'core/block';
import './chats.css';
import { RegisterComponent } from 'core';
import Message from './components/message';
import ChatList from './components/chatList';
import ChatForm from './components/chatForm';

RegisterComponent(Message, "Message");
RegisterComponent(ChatList, "ChatList");
RegisterComponent(ChatForm, "ChatForm");

export class Chats extends Block {

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
