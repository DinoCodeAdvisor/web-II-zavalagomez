import '../style/login.css'
import MyInput from '../components/Form/MyInput';

export default function Login()
{
    return (
        <div className="page-container">
            <div className="containerLogin">
                <h3>Login</h3>
                <form className="formLogin">
                    <div>
                        <input className='login-input' type="text" placeholder='User' name='user'  />
                    </div>
                    <div>
                        <input className='login-input' type="password" placeholder='Password' name='password'  />
                    </div>                  
                    <div className='login-button-container'>
                        <button className='login-button' type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}