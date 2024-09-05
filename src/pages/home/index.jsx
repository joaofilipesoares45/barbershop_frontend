import { Navigate } from 'react-router-dom';
import Header from './components/header'
import Main from './components/main';

function Home() {

    if (localStorage.getItem('currentUser') !== null) {
        const user = JSON.parse(localStorage.currentUser)
        if (user.tipo === 'empresa') {
            return <Navigate to='/barbershop_frontend/BarberSide' />
        }
    }
    return (
        <div className='page Home'>
            <Header />
            <Main />
        </div>
    )
}

export default Home 