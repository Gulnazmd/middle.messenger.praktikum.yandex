import button from '../../components/button/button';
import input from '../../components/input/input';
import '../main.css'

const content = `
        <form action="" method="post" class="form">
          <div class="title form__title">Create new profile</div>
            ${new input({ label: 'first name', name: 'first_name', value: '{{first_name}}', type: 'text', placeholder: 'placeholder', error: '{{error}}'})}
            ${new input({ label: 'second name', name: 'second_name', value: '{{second_name}}', type: 'text', placeholder: 'placeholder', error: '{{error}}'})}
            ${new input({ label: 'login', name: 'login', value: '{{login}}', type: 'text', placeholder: 'placeholder', error: '{{error}}' })}
            ${new input({ label: 'email', name: 'email', value: '{{email}}',type: 'text', placeholder: 'placeholder', error: '{{error}}' })}
            ${new input({ label: 'password', name: 'password', value: '{{password}}', type: 'password', placeholder: 'placeholder', error: '{{error}}'})}
            ${new input({ label: 'repeat password', name: 'password2', value: '{{password2}}', type: 'password', placeholder: 'placeholder', error: '{{error}}'})}
            ${new input({ label: 'phone', name: 'phone', value: '{{phone}}', type: 'number', placeholder: 'placeholder', error: '{{error}}' })}
                <div>
                    ${button('Register')}
                </div>
                <small>You have an account?</small>
                <a class="my-link" href="../login/login.html">
                Sign In
                </a>
        </form>
`;
export default content;