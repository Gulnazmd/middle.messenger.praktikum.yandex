import button from '../../components/button/button';
import input from '../../components/input/input';
import '../../pages/main.css'

const content = `

        <form action="" method="post" class="form">
            <div class="title form__title">Sign In</div>
                ${input({label: 'Login', name: 'login', value: '{{login}}', maxlength: '90', type: 'text'})}
                ${input({ label: 'Password', name: 'password', value: '{{password}}', maxlength: '90', type: 'password' })}
                    <div>
                        ${button('Sign In')}
                    </div>
                    <small>You don't have an account?</small>
                    <a class="my-link" href="../registration/registration.html">
                    Register
                    </a>
        </form>
`;
export default content;