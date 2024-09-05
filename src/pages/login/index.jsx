import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import './css/login.css'

import CreateForm from './components/CreateAcount'
import LoginForm from './components/Login'


function Login() {
    const [form, setForm] = useState(true)
    const handleChangeForm = (event) => {
        if (event.target.classList[0] === 'log-change') {
            form ? setForm(false) : setForm(true)
        }
    }
    if (localStorage.getItem('currentUser') !== null) {
        const user = JSON.parse(localStorage.currentUser)
        if (user.tipo === 'empresa') {
            return <Navigate to='/BarberSide'/>
        }else{
            if (localStorage.getItem('barberHistory') !== null) {
                const href = JSON.parse(localStorage.barberHistory)
                console.log(href);
                
                return <Navigate to={href}/>
            }
        }
    }

    return (
        <main className="page login-main" onClick={handleChangeForm} >
            <header>
                <h1>
                    <FontAwesomeIcon icon={solid.faScissors} className='icon fa-scissors' />
                    BarberShop
                </h1>
            </header>
            <section>
                <h2>Faça o Login <br/>para continuar!</h2>
                
                {form ? <LoginForm />: <CreateForm />}
            </section>
        </main>

    )
}

export default Login
