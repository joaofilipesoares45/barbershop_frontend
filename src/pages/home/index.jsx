import { Navigate } from 'react-router-dom';
import Header from './components/header'
import Main from './components/main';

function Home() {

    if (localStorage.getItem('currentUser') !== null) {
        const user = JSON.parse(localStorage.currentUser)
        if (user.tipo === 'empresa') {
            return <Navigate to='/barbershop_frontend/barber-side'/>
        }else{
            if (localStorage.getItem('barberHistory') !== null) {
                const href = JSON.parse(localStorage.barberHistory)
                console.log(href);
                
                return <Navigate to={`/barbershop_frontend${href}`}/>
            }
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