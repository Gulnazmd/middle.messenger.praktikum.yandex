import 'pages/main.css';
import Block from 'core/block';

class Error extends Block<{}> {
  render() {
    return `
    <div class="main">
    <form class="form main__form">
      <h1>404</h1>
      <h3>Opps! Page not found</h3>
      <p>Sorry, the page you are looking for doesn’t exist</p>
      {{{Link text="Return home" to="/login"}}}
    </form>
  </div>
    `;
  }
}

export default Error;
