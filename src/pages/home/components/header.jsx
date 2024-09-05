import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical, faGear, faScissors, faUser } from '@fortawesome/free-solid-svg-icons'
import '../css/header.css'

function Header() {
    return (
        <header className='Header'>
            <h1>
                <a href="/home" style={{ color: 'white', textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faScissors} className='icon fa-scissors' />
                    BarberShop
                </a>
            </h1>
            <div className='header-opt-div'>
                <FontAwesomeIcon icon={faEllipsisVertical} />
                <div>
                    <FontAwesomeIcon icon={faUser} />
                    <FontAwesomeIcon icon={faGear} />
                </div>
            </div>
        </header>
    )
}

export default Header
