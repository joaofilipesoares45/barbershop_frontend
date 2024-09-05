import { useState } from 'react';
import { log } from '../../../methods/login'
import '../css/login.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";


function CreateForm() {
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
        }else{
            target.removeAttribute('right')
        }
    }

    const [visibility, setVisibility] = useState(true)

    return (
        <div className="form-login-div" open>
            <h3>Nova Conta</h3>
            <form>
                <div className="inputs" onFocus={openInput} onBlur={closeInput}>
                    <div>                        
                        <input type="text" name="nome" placeholder="nome" id='nome' color='red' />
                        <label htmlFor="nome">nome</label>
                    </div>

                    <div>                        
                        <input type="text" name="email" placeholder="e-mail" id='email' />
                        <label htmlFor="email">email</label>
                    </div>

                    <div>                       
                        <input type="number" name="idade" placeholder="idade" maxLength={3} id='idade' /> 
                        <label htmlFor="idade">idade</label>
                    </div>

                    <div>
                        <input type="tel" name="telefone1" placeholder="telefone 1" id='telefone1' />
                        <label htmlFor="telefone1">telefone/celular</label>
                    </div>

                    {/* <div>
                        <input type="tel" name="telefone2" placeholder="telefone 2" id='telefone2' />
                        <label htmlFor="telefone2">telefone 2</label>
                    </div> */}

                    <div>
                        <input type={visibility ? 'password' : 'text'} name="senha" placeholder="senha" id='senha' />
                        <label htmlFor="senha">senha</label>
                        <FontAwesomeIcon icon={visibility ? solid.faEye : solid.faEyeSlash} onClick={() => {visibility ? setVisibility(false) : setVisibility(true)}}/>
                    </div>
                </div>
                <button onClick={log} className="create--">Login</button>
            </form>
            <button className="log-change">Já tem um Conta!!</button>
        </div>
    )
}

export default CreateForm