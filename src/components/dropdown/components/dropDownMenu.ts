import Block from 'core/block';
import './dropdown.css';
import { IDropdownItemProps } from './dropdownItem/dropdownItem';

interface IDropdownMenuProps {
  onClick: () => void,
  items: IDropdownItemProps[],
}

class DropdownMenu extends Block<IDropdownMenuProps> {
  render() {
    return `
      <ul class="dropdownMenu">
        {{#each items}}
          {{{ DropdownItem title=title onClick=onClick }}}
        {{/each}}
      </ul>
    `;
  }
}

export default DropdownMenu;
