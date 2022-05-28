import button from '../../components/button/button';
import input from '../../components/input/input';
import '../main.css'

const content = `

        <form action="" method="post" class="form">
          <div class="title form__title">Create new profile</div>
            ${input({ label: 'first name', name: 'first_name', value: '{{first_name}}', type: 'text' })}
            ${input({label: 'second name', name: 'second_name', value: '{{second_name}}', type: 'text'})}
            ${input({ label: 'login', name: 'login', value: '{{login}}', maxlength: '90', type: 'text' })}
            ${input({label: 'email', name: 'email', value: '{{email}}', maxlength: '90', type: 'text'})}
            ${input({ label: 'password', name: 'password', value: '{{password}}', maxlength: '90', type: 'password' })}
            ${input({ label: 'repeat password', name: 'password2', value: '{{password2}}', maxlength: '90', type: 'password' })}
            ${input({label: 'phone', name: 'phone', value: '{{phone}}', maxlength: '90', type: 'number'})}
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