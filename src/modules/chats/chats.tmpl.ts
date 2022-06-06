import './chats.css';
import input from '../../components/input/input';

const chats = `
        <div class="chats">
            <div class="header chats__header">
              <p class="prfl chats__prfl">Profile > </p></br>
              ${new input({ placeholder: 'Search', name: 'search', type: 'text', label: 'search', value: '{{value}}', error: '{{error}}'})}
              <div class="list chats__list" id="{{ chatsListId }}"></div>
            </div>
            <span class="span chats__span"></span>
            <div class="message-container chats__message-container">
              <div class="chats__messages" id="{{ messagesId }}"></div>
              <div class="chats__form" id="{{ formId }}"></div>
            </div>
        </div>
`;
export default chats;