import Block from 'core/block';
import './chats.css';
import Message from './components/message';
import ChatList from './components/chatList';
import ChatForm from './components/chatForm';
import { RegisterComponent } from 'core';

RegisterComponent(Message);
RegisterComponent(ChatList);
RegisterComponent(ChatForm);

export class Chats extends Block {
  render() {

    return `
  <div class="chats">
      {{{ChatList}}}
    <span class="span chats__span"></span>
    <div>
      <div class="profileSettings chats__profileSettings">
        <span class="photo chats__photo"></span>
        <p>Name</p>
        <p>⋮</p>
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
