import { setMsg } from "../pages/home/components/notif"
import { connectionApi } from "./connectionApi"

const log = (e) => {
    e.preventDefault()
    const form = e.target.parentElement.querySelectorAll('.inputs input')

    const user = {
        nome: '',
        email: '',
        tipo: 'cliente',
        telefone1: '',
        telefone2: '',
        idade: '',
        senha: '',
    }
    form.forEach(input => {
        user[input.name] = input.value;
        if (input.name === `idade`) {
            user[input.name] = Number(input.value)
        }
    })

    if (e.target.classList[0] === 'login--') {
        login(user)
    } else {
        newAcount(user)
    }
}

const newAcount = async (user) => {
    if (user.nome.length > 0 && user.email.length > 0 && (user.telefone1.length > 0 || user.telefone2.length > 0)) {
        let msg = {}
        const login = await connectionApi('post', 'user', user).then((res) => res.json()).then(data => { return data })
        if (login.type) {
            setMsg(login)
            return
        }

        const users = await connectionApi('get', 'user')  
        if (!users) {
            msg.title = 'Sem conexão ao servidor!'
            msg.type = 'red'
            setMsg(msg)
            return
        }

        users.forEach(element => {
            if (user.email === element.email) {
                localStorage.currentUser = JSON.stringify(element)
                msg.title = 'Login bem Sucedido!'
                msg.type = ''
                setMsg(msg)
                setTimeout(() => {
                    window.location = '/barbershop_frontend/home'
                }, 2000)
            }
        })
    }
}

const login = async (logUser) => {

    const login = await connectionApi('post', 'login', logUser).then((res) => res.json()).then(data => { return data })
    if (login) {
        if (login.type) {
            setMsg(login)
        } else {
            localStorage.currentUser = JSON.stringify(login.data)
            
            setMsg(login.message)
            setTimeout(() => {
                window.location = '/barbershop_frontend/home'
            }, 2000)
        }
    } else {
        setMsg({ title: 'Sem conexão ao servidor', type: 'red' })
        return
    }

}

const logOut = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('barberHistory')
    window.location = '/barbershop_frontend/'
}

export { log, logOut }