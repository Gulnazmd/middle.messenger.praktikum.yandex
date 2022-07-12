import Block from 'core/block';
import './avatar.css';
import IAvatarProps from './types/props'

class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <form class='avatar'>
        <label for='avatar__file-upload' class='avatar__label'></label>
        {{{ Input
            type="file"
            alt="Select photo"
            placeholder="SelectPhoto"
            name="avatar"
            id="avatar__file-upload"
            className="avatar__file-upload"
            accept="image/*"
            onChange=onChange
        }}}
        <div class='avatar__image-wrap'>
          {{#if imageUrl}}
            <img class='avatar__image' src={{imageUrl}} alt="" />
          {{else}}
            <img class='avatar__image avatar__image-placeholder' src={{imageUrl}} alt="" />
          {{/if}}
        </div>
      </form>
  `;
  }
}

export default Avatar;
