import Block from 'core/block';

interface LandingProps  {}

export class Landing extends Block {
  constructor(props: LandingProps) {
    super({
      ...props,
    });

    this.setProps({
      onClickButton: this.onClickButton.bind(this),
    })
  }

  onClickButton() {
    console.log('clicked')
  }

  render() {
    return `
      <div class="main">
      <div class="form main__form">
        <span class="circle"></span>
        <h1>Welcome</h1>
        <h3>your best messenger</h3>
        {{{Button text="Login" onClick=onClickButton}}}
        {{{Link text="{{text}}" to="{{to}}"}}}
      </div>
      </div>
    `;
  }
}
