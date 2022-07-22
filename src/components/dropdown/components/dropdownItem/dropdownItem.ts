import Block from '../../../../core/block';

export interface IDropdownItemProps {
  title: string,
  onClick: () => void,
}

interface IDropdownMenuPropsWithEvents extends Omit<IDropdownItemProps, 'onClick'> {
  events: {
    click: () => void,
  }
}

class DropdownMenu extends Block<IDropdownMenuPropsWithEvents> {
  constructor(props: IDropdownItemProps) {
    const { onClick, ...rest } = props;

    super({
      ...rest,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <li class="dropdownItem">
        {{title}}
      </li>
    `;
  }
}

export default DropdownMenu;
