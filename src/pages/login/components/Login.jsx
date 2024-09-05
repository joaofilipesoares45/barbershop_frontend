import { useState } from 'react';
import { log } from '../../../methods/login'
import '../css/login.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
    const openInput = (e) => {
        const target = e.target
        if (target.tagName === 'INPUT' && target.value.length === 0) {
            target.setAttribute('open', '')
            target.parentElement.querySelector(`label[for=${target.id}]`).setAttribute('none', '')
        }
    }
    const closeInput = (e) => {
        const target = e.target
        if (target.tagName === 'INPUT' && target.value.length !== 0) {
            target.setAttribute('right', '')
        } else {
            target.removeAttribute('right')
        }
    }

    const [visibility, setVisibility] = useState(true)

    return (
        <div className="form-login-div" open>
            <h3>Login</h3>
            <form>
                <div className="inputs" onFocus={openInput} onBlur={closeInput}>
                    <div>
                        <input type="text" name="email" placeholder="e-mail" id='email' />
                        <label htmlFor="email">email</label>
                    </div>
                    <div>
                        <input type={visibility ? 'password' : 'text'} name="senha" id="senha"/>
                        <label htmlFor="senha">senha</label>
                        <FontAwesomeIcon icon={visibility ? solid.faEye : solid.faEyeSlash} onClick={() => {visibility ? setVisibility(false) : setVisibility(true)}}/>
                    </div>
                </div>
                <button onClick={log} className="login--">Login</button>
            </form>
            <button className="log-change">Ainda não tem conta!!</button>
        </div>
    )
}

export default LoginForm