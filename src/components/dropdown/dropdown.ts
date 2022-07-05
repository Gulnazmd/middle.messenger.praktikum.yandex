import Block from 'core/Block';
import './dropdown.css';
import { registerComponent } from 'core';
import { DropdownMenu } from './components';
import IDropdownProps from './types/dropdownProps';
import { DropdownItem } from './components/dropdownItem';

registerComponent(DropdownMenu, 'DropdownMenu');
registerComponent(DropdownItem, 'DropdownItem');

type IDropdownPropsWithEvents = Omit<IDropdownProps, 'openDropdown'>

class Dropdown extends Block<IDropdownPropsWithEvents> {
  constructor(props: IDropdownProps) {
    super({
      ...props,
    });
  }

  protected getStateFromProps() {
    this.state = {
      isOpen: false,
      toggleDropdown: null, // this.handleToggleDropdown.bind(this, true),
    };
  }

  handleToggleDropdown(isOpen: boolean) {
    const callback = (e: Event) => {
      const { target } = e;
      const isDropdownMenu = (target as HTMLElement).classList.contains('dropdownMenu');
      if (!isDropdownMenu) {
        this.handleToggleDropdown(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', callback);
    } else {
      window.removeEventListener('click', callback);
    }

    this.setState({
      isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;

    return `
      <div class="dropdown">
      {{{Button onClick=toggleDropdown text="⋮"}}}
        {{#if ${isOpen}}}
          {{{ DropdownMenu items=items }}}
        {{/if}}
      </div>
    `;
  }
}

export default Dropdown;
